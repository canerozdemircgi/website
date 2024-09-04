'use strict';

class LabelFull extends HTMLElement
{
	static #LabelFullString(id, label, value)
	{
return `\
<span>${label}</span>
<span class='label-full-tail unselectable'>=</span>
<span id='${id}_LabelFull_Value'>${value}</span>`;
	}

	get #id() { return this.getAttribute('id'); }
	get #label() { return this.getAttribute('label'); }

	get value() { return this.getAttribute('value'); }
	set value(value) { this.setAttribute('value', value); }

	#node_value;

	constructor()
	{
		super();

		this.className = 'selectable';
		this.insertAdjacentHTML('beforeend', LabelFull.#LabelFullString(this.#id, this.#label, this.value));

		this.#node_value = document.getElementById(`${this.#id}_LabelFull_Value`);
	}

	static get observedAttributes() { return ['value']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		if (attribute === 'value')
			this.#node_value.textContent = value_new;
	}
}
window.customElements.define('label-full', LabelFull);