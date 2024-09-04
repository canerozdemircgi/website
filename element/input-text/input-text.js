'use strict';

class InputText extends HTMLElement
{
	static #InputTextString(id, value)
	{
return `\
<input id='${id}_InputText_Input' class='input-text' type='text' value='${value}'>`;
	}

	get #id() { return this.getAttribute('id'); }

	get value() { return this.getAttribute('value'); }
	set value(value) { this.setAttribute('value', value); }

	#node_input;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', InputText.#InputTextString(this.#id, this.value));

		this.#node_input = document.getElementById(`${this.#id}_InputText_Input`);
		this.#node_input.addEventListener('change', () =>
		{
			this.value = this.#node_input.value;
			this.SignalRefresh();
		});
	}
}
window.customElements.define('input-text', InputText);