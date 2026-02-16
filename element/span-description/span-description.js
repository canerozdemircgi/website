'use strict';

class SpanDescription extends HTMLElement
{
	get #type() { return this.getAttribute('type'); }

	constructor()
	{
		super();

		switch (this.#type)
		{
			case 'up':
				this.className = 'span-description-up';
				break;

			case 'dw':
				this.className = 'span-description-dw';
				break;
		}
	}
}
window.customElements.define('span-description', SpanDescription);