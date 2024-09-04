'use strict';

class SpanDescription extends HTMLElement
{
	static #SpanDescriptionString(href, title, text)
	{
return `
<a target='_blank' class='f_serif' href='${href}'>${title}</a>
<div class='br10'></div>
<span class='span-description-bottom'>${text}</span>`;
	}

	constructor()
	{
		super();

		const innerHTML = this.innerHTML.trim().split('\n');
		this.innerHTML = null;

		const href = innerHTML.shift();
		const title = innerHTML.shift();
		const text = innerHTML.join('\n');
		this.insertAdjacentHTML('beforeend', SpanDescription.#SpanDescriptionString(href, title, text));

		const u_elements = this.getElementsByTagName('u');
		for (const u_element of u_elements)
			u_element.classList.add('f_mono');
	}
}
window.customElements.define('span-description', SpanDescription);