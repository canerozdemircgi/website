'use strict';

class HeaderDouble extends HTMLElement
{
	static #HeaderDoubleString(text1, text2)
	{
		return `\
<a href='${GetHrefWithParameters(window.location.href, {path: window.menu_tree.children[0].path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false;'>
	<span class='header-double-1'>${text1}</span>
	<br class='br00'>
	<span class='header-double-2'>${text2}</span>
</a>`;
	}

	get #text1() { return this.getAttribute('text1'); }
	get #text2() { return this.getAttribute('text2'); }

	constructor() { super(); }

	CreateElement()
	{
		this.className = 'header-double-light';

		this.insertAdjacentHTML('beforeend', HeaderDouble.#HeaderDoubleString(this.#text1, this.#text2));

		setIntervalImmediate(this.#RefreshAnimation.bind(this), 250);
	}

	#RefreshAnimation()
	{
		if (Math.random() > 0.25)
			this.classList.add('header-double-light');
		else
			this.classList.remove('header-double-light');
	}
}
window.customElements.define('header-double', HeaderDouble);