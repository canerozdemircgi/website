'use strict';

class LabelHalf extends HTMLElement
{
	static #LabelHalfUnlitString()
	{
return `\
<span class='label-half-tail unselectable'>=</span>`;
	}

	static #LabelHalfNeonString(neon)
	{
return `\
<span class='label-half-neon' style='filter: drop-shadow(0 0 2px ${neon}) drop-shadow(0 0 4px ${neon});'></span>
<span class='label-half-tail unselectable'>=</span>`;
	}

	get #is_neon() { return this.hasAttribute('neon'); }
	get #neon() { return this.getAttribute('neon'); }

	constructor()
	{
		super();

		if (this.#is_neon)
		{
			this.className = 'selectable';
			this.insertAdjacentHTML('beforeend', LabelHalf.#LabelHalfNeonString(this.#neon));
		}
		else
		{
			this.className = 'label-half-unlit selectable';
			this.insertAdjacentHTML('beforeend', LabelHalf.#LabelHalfUnlitString());
		}
	}
}
window.customElements.define('label-half', LabelHalf);