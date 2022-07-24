'use strict';

class HrefImage extends HTMLElement
{
	static #HrefImageString(src)
	{
return `\
<a target='_parent' href='${src}'><img src='${src}'></a>`;
	}

	get #src() { return this.getAttribute('src'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', HrefImage.#HrefImageString(this.#src));
	}
}
window.customElements.define('href-image', HrefImage);