'use strict';

class SeparatorNatty extends HTMLElement
{
	static #SeparatorNattyHorizontalString()
	{
return `\
<span class='separator-natty-line-horizontal'></span>
<span class='separator-natty-circle'></span>
<span class='separator-natty-line-horizontal'></span>`;
	}

	static #SeparatorNattyVerticalString()
	{
return `\
<span class='separator-natty-line-vertical'></span>
<span class='separator-natty-circle'></span>
<span class='separator-natty-line-vertical'></span>`;
	}

	get #horizontal() { return this.hasAttribute('horizontal'); }
	get #vertical() { return this.hasAttribute('vertical'); }
	get #circle() { return this.hasAttribute('circle'); }

	constructor()
	{
		super();

		if (this.#circle)
		{
			if (this.#horizontal)
			{
				this.className = 'separator-natty-horizontal';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.#SeparatorNattyHorizontalString());
			}
			else if (this.#vertical)
			{
				this.className = 'separator-natty-vertical';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.#SeparatorNattyVerticalString());
			}
		}
		else
		{
			if (this.#horizontal)
				this.className = 'separator-natty-line-horizontal';
			else if (this.#vertical)
				this.className = 'separator-natty-line-vertical';
		}
	}
}
window.customElements.define('separator-natty', SeparatorNatty);