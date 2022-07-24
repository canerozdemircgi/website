'use strict';

class TitleTop extends HTMLElement
{
	static #TitleTopString(id, char)
	{
return `\
<span id='${id}_TitleTopChar' class='title-top-char'>${char}</span>`;
	}

	#animation_elements;
	#animation_elements_length;
	#animation_elements_index;
	#animation_elements_enhancer;
	#animation_interval;

	constructor() { super(); }

	CreateElement()
	{
		const title_chars = window.menu_last.text.toUpperCase().split('');

		this.#animation_elements = [];
		this.#animation_elements_length = 0;
		for (let i = 0; i < title_chars.length; ++i)
		{
			this.insertAdjacentHTML('beforeend', TitleTop.#TitleTopString(i, title_chars[i]));
			if (title_chars[i] !== ' ')
				this.#animation_elements[this.#animation_elements_length++] = document.getElementById(`${i}_TitleTopChar`);
		}

		this.#animation_elements_index = 0;
		this.#animation_elements_enhancer = 1;

		this.#animation_elements[this.#animation_elements_index].classList.add('title-top-char-light');
		this.#animation_interval = setInterval(this.#RefreshAnimation.bind(this), 1000);
	}

	RefreshElement()
	{
		clearInterval(this.#animation_interval);

		while (this.childElementCount > 0)
			this.lastChild.remove();
		this.CreateElement();
	}

	#RefreshAnimation()
	{
		this.#animation_elements[this.#animation_elements_index].classList.remove('title-top-char-light');
		this.#animation_elements_index += this.#animation_elements_enhancer;
		if (this.#animation_elements_index < 0 || this.#animation_elements_index >= this.#animation_elements_length)
		{
			this.#animation_elements_enhancer *= -1;
			this.#animation_elements_index += this.#animation_elements_enhancer;
		}
		this.#animation_elements[this.#animation_elements_index].classList.add('title-top-char-light');
	}
}
window.customElements.define('title-top', TitleTop);