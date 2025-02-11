'use strict';

class HrefImage extends HTMLElement
{
	static #HrefImageString(src, style)
	{
return `\
<a target='_parent' href='${src}'><img src='${src}' style='${style}'></a>`;
	}

	get #src() { return this.getAttribute('src'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', HrefImage.#HrefImageString(this.#src, this.getAttribute('style')));
		this.removeAttribute('style')
	}
}
window.customElements.define('href-image', HrefImage);