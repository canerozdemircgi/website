'use strict';

class HrefMain extends HTMLElement
{
	static #HrefMainString(id, href, text)
	{
return `\
<a id='${id}_Href' class='selectable' href='${href}'>${text}</a>`;
	}

	get #id() { return this.getAttribute('id'); }
	set #id(value) { this.setAttribute('id', value); }

	get #type() { return this.getAttribute('type'); }

	get href() { return this.getAttribute('href'); }
	set href(value) { this.setAttribute('href', value); }

	#node_href;

	constructor()
	{
		super();

		if (this.#id === null)
			this.#id = Date.now().toString(36) + Math.random().toString(36).replace('.', '');

		if (this.innerHTML === '')
			this.innerHTML = this.href;
		this.href = GetHrefWithRedirect(this.href);

		const innerHTML = `${this.innerHTML}`;
		this.innerHTML = null;
		this.insertAdjacentHTML('beforeend', HrefMain.#HrefMainString(this.#id, this.href, innerHTML));

		this.#node_href = document.getElementById(`${this.#id}_Href`);

		this.#node_href.classList.add(`href-${this.#type}`);

		if (this.#node_href.host !== window.location.host || this.href.indexOf('redirect.html?address=') >= 0)
			this.#node_href.setAttribute('target', '_blank');
	}

	static get observedAttributes() { return ['href']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		switch (attribute)
		{
			case 'href':
				this.#node_href.href = this.href;
				break;
		}
	}
}
window.customElements.define('href-main', HrefMain);