'use strict';

class TitleTop extends HTMLElement
{
	static #TitleTopCharBackString(char)
	{
return `\
<span class='title-top-char'>${char}</span>`;
	}

	static #TitleTopCharFrontString(id, char)
	{
return `\
<span id='${id}_TitleTopChar' class='title-top-char'>${char}</span>`;
	}

	static #TitleTopRealString(id)
	{
return `\
<span id='${id}_TitleTopReal' class='title-top-real'></span>`;
	}

	#title_top_real;
	#animation_elements;
	#animation_elements_length;
	#animation_elements_index;
	#animation_elements_enhancer;
	#animation_interval;

	get #id() { return this.getAttribute('id'); }

	constructor() { super(); }

	CreateElement()
	{
		this.parentElement.parentElement.parentElement.insertAdjacentHTML('beforeend', TitleTop.#TitleTopRealString(this.#id));
		this.#title_top_real = document.getElementById(`${this.#id}_TitleTopReal`);

		const title_chars = window.menu_last.text.toUpperCase().split('');

		this.#animation_elements = [];
		this.#animation_elements_length = 0;
		for (let i = 0; i < title_chars.length; ++i)
		{
			this.insertAdjacentHTML('beforeend', TitleTop.#TitleTopCharBackString(title_chars[i]));
			this.#title_top_real.insertAdjacentHTML('beforeend', TitleTop.#TitleTopCharFrontString(i, title_chars[i]));
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

		this.replaceChildren();
		this.parentElement.parentElement.parentElement.children[1].remove();
		this.CreateElement();
	}

	#RefreshAnimation()
	{
		this.#title_top_real.style.visibility = 'hidden';

		this.#animation_elements[this.#animation_elements_index].classList.remove('title-top-char-light');
		this.#animation_elements_index += this.#animation_elements_enhancer;
		if (this.#animation_elements_index < 0 || this.#animation_elements_index >= this.#animation_elements_length)
		{
			this.#animation_elements_enhancer *= -1;
			this.#animation_elements_index += this.#animation_elements_enhancer;
		}
		this.#animation_elements[this.#animation_elements_index].classList.add('title-top-char-light');

		this.#title_top_real.style.visibility = 'visible';
	}
}
window.customElements.define('title-top', TitleTop);