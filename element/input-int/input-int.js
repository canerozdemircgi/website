'use strict';

class InputInt extends HTMLElement
{
	static #InputIntString(id, value, width_input, width_button)
	{
return `\
<button id='${id}_InputInt_ButtonB' class='input-int-button-b' style='width: ${width_button};'>
	<svg class='input-int-img' width='10' height='10'>
		<use href='resource/button/Caret - Left.svg#$Caret - Left'></use>
	</svg>
</button>
<input id='${id}_InputInt_Input' class='input-int-input' type='text' value='${value}' style='width: ${width_input};'>
<button id='${id}_InputInt_ButtonN' class='input-int-button-n' style='width: ${width_button};'>
	<svg class='input-int-img' width='10' height='10'>
		<use href='resource/button/Caret - Right.svg#$Caret - Right'></use>
	</svg>
</button>`;
	}

	get #id() { return this.getAttribute('id'); }

	get value() { return Number(this.getAttribute('value')); }
	set value(value) { this.setAttribute('value', value); }

	get #value_default() { return Number(this.getAttribute('value_default')); }
	get value_min() { return Number(this.getAttribute('value_min')); }
	get value_max() { return Number(this.getAttribute('value_max')); }
	set value_max(value) { this.setAttribute('value_max', value); }

	get #width_input() { return this.getAttribute('width_input'); }
	get #width_button() { return this.getAttribute('width_button'); }

	#node_button_b;
	#node_input;
	#node_button_n;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', InputInt.#InputIntString(this.#id, this.value, this.#width_input, this.#width_button));

		this.#node_button_b = document.getElementById(`${this.#id}_InputInt_ButtonB`);
		this.#node_button_b.addEventListener('click', () => { this.value -= 1; });

		this.#node_input = document.getElementById(`${this.#id}_InputInt_Input`);
		this.#node_input.addEventListener('change', () => { this.value = this.#node_input.value; });

		this.#node_button_n = document.getElementById(`${this.#id}_InputInt_ButtonN`);
		this.#node_button_n.addEventListener('click', () => { this.value += 1; });
	}

	static get observedAttributes() { return ['value', 'value_min', 'value_max']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		switch (attribute)
		{
			case 'value':
				if (isNaN(this.value))
				{
					this.value = this.#value_default;
					return;
				}
				else if (this.value < this.value_min)
				{
					this.value = this.value_min;
					return;
				}
				else if (this.value > this.value_max)
				{
					this.value = this.value_max;
					return;
				}

				switch (this.value)
				{
					case this.value_min:
						this.#node_button_b.disabled = true;
						this.#node_button_n.disabled = false;
						break;

					case this.value_max:
						this.#node_button_b.disabled = false;
						this.#node_button_n.disabled = true;
						break;

					default:
						this.#node_button_b.disabled = false;
						this.#node_button_n.disabled = false;
				}

				this.#node_input.value = this.value;
				this.SignalRefresh();
				break;

			case 'value_min':
				if (this.value < this.value_min)
					this.value = this.value_min;
				this.#node_button_b.disabled = this.value === this.value_min;
				break;

			case 'value_max':
				if (this.value > this.value_max)
					this.value = this.value_max;
				this.#node_button_n.disabled = this.value === this.value_max;
				break;
		}
	}
}
window.customElements.define('input-int', InputInt);