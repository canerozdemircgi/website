'use strict';

class FooterSingle extends HTMLElement
{
	static #alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	static #FooterSingleSignString()
	{
return `\
<span ${GetRandomColor(16, 72, 128, 255, 16, 72)}>${FooterSingle.#alphabet.charAt(Math.floor(Math.random() * FooterSingle.#alphabet.length))}</span>`;
	}

	#footer_single_sign;

	constructor()
	{
		super();

		this.className = 'selectable';

		this.#footer_single_sign = document.createElement('span');
		this.#footer_single_sign.className = 'footer_single_sign';
		const spans = [];
		for (let i = 0; i < 64; ++i)
			spans.push(FooterSingle.#FooterSingleSignString());
		this.#footer_single_sign.insertAdjacentHTML('beforeend', spans.join(''));
		this.appendChild(this.#footer_single_sign);

		setIntervalImmediate(this.#RefreshAnimation.bind(this), 500);
	}

	#RefreshAnimation()
	{
		if (Math.random() > 0.375)
		{
			this.#footer_single_sign.firstChild.remove();
			this.#footer_single_sign.insertAdjacentHTML('beforeend', FooterSingle.#FooterSingleSignString());
		}
	}
}
window.customElements.define('footer-single', FooterSingle);