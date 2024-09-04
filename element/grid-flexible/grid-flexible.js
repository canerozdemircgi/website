'use strict';

class GridFlexible extends HTMLElement
{
	get #element_width() { return this.getAttribute('element_width'); }
	get #element_height() { return this.getAttribute('element_height'); }
	get #element_gap() { return this.getAttribute('element_gap'); }

	constructor()
	{
		super();

		this.style.gridTemplateColumns = `repeat(auto-fit, ${this.#element_width})`;
		this.style.gridAutoRows = this.#element_height;
		this.style.gap = this.#element_gap;
	}
}
window.customElements.define('grid-flexible', GridFlexible);