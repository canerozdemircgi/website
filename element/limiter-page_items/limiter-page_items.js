'use strict';

class LimiterPageItems extends HTMLElement
{
	static #LimiterPageItemsString(id, items_max, element_height)
	{
return `\
<span class='limiter-page_items-top' style='grid-auto-rows: ${element_height};'>
	<label-half style='width: 75px;'>Page</label-half>
	<input-int id='${id}_Page_InputInt' value='1' value_default='1' value_min='1' value_max='999' width_input='50px' width_button='40px'></input-int>
	<label-half style='width: 75px;'>Items</label-half>
	<input-int id='${id}_Items_InputInt' value='10' value_default='10' value_min='1' value_max='${items_max}' width_input='50px' width_button='40px'></input-int>
</span>
<span class='limiter-page_items-bottom' style='grid-auto-rows: ${element_height};'>
	<label-full id='${id}_Shown_LabelFull' label='Shown' value='0 - 0' style='width: 170px;'></label-full>
	<label-full label='Count' value='${items_max}' style='width: 120px;'></label-full>
	<href-main id='${id}_Refresh_HrefButton' type='button' href='' style='width: 130px;'>Refresh</href-main>
</span>`;
	}

	get #id() { return this.getAttribute('id'); }
	get #param() { return this.getAttribute('param'); }
	get #items_max() { return parseInt(this.getAttribute('items_max')); }
	get #element_height() { return this.getAttribute('element_height'); }

	get #page() { return this.#node_page.value; }
	set #page(value) { this.#node_page.value = value; }
	get #items() { return this.#node_items.value; }
	set #items(value) { this.#node_items.value = value; }

	get offset() { return (this.#page - 1) * this.#items; }
	get limit() { return Math.min(this.#page * this.#items, this.#items_max); }

	#node_page;
	#node_items;
	#node_shown;
	#node_refresh;

	#param_items_key;
	#param_page_key;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', LimiterPageItems.#LimiterPageItemsString(this.#id, this.#items_max, this.#element_height));

		this.#node_page = document.getElementById(`${this.#id}_Page_InputInt`);
		this.#node_items = document.getElementById(`${this.#id}_Items_InputInt`);
		this.#node_shown = document.getElementById(`${this.#id}_Shown_LabelFull`);
		this.#node_refresh = document.getElementById(`${this.#id}_Refresh_HrefButton`);

		this.#param_items_key = `${this.#param}_items`;
		this.#param_page_key = `${this.#param}_page`;

		this.RefreshElement();

		this.#node_page.SignalRefresh = () =>
		{
			this.#node_refresh.href = GetHrefWithParameters(this.#node_refresh.href, {[this.#param_page_key]: this.#page}, HrefParameterMode.override);
		};
		this.#node_items.SignalRefresh = () =>
		{
			this.#node_refresh.href = GetHrefWithParameters(this.#node_refresh.href, {[this.#param_items_key]: this.#items}, HrefParameterMode.override);
			this.#node_page.value_max = Math.ceil(this.#items_max / this.#items);
		};

		this.#node_refresh.onclick = () =>
		{
			this.#node_shown.value = `${this.offset + 1} - ${this.limit}`;

			NavigatePage(this.#node_refresh.href, this.SignalRefresh);
			return false;
		};
	}

	RefreshElement()
	{
		const param_all = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams;
		const param_items = param_all.get(this.#param_items_key);
		const param_page = param_all.get(this.#param_page_key);
		if (param_items !== null)
			this.#items = param_items;
		this.#node_page.value_max = Math.ceil(this.#items_max / this.#items);
		if (param_page !== null)
			this.#page = param_page;

		this.#node_shown.value = `${this.offset + 1} - ${this.limit}`;
		this.#node_refresh.href = GetHrefWithParameters(window.location.href, {[this.#param_items_key]: this.#items, [this.#param_page_key]: this.#page}, HrefParameterMode.override);

		if (param_items === null || param_page === null)
			history.replaceState(String(RefreshPage), '', this.#node_refresh.href);
	}
}
window.customElements.define('limiter-page_items', LimiterPageItems);