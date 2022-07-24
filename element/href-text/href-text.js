'use strict';

class HrefText extends HTMLAnchorElement
{
	get #href() { return this.getAttribute('href'); }
	set #href(value) { this.setAttribute('href', value); }

	constructor()
	{
		super();

		this.className = 'href-text selectable';
		this.title = '';

		if (this.innerText === '')
			this.innerText = this.#href;

		this.#href = GetHrefWithRedirect(this.#href);
	}
}
window.customElements.define('href-text', HrefText, {extends: 'a'});