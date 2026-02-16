'use strict';

class FooterSingle extends HTMLElement
{
	static #alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789カキクケコサシスセソタチツテトナニヌネノハヒフヘホ一二三四五六七八九十';

	static #FooterSingleVersionString()
	{
return `\
WebSite Version: <span id='version_website' class='version'>x.x.xx</span><div class='br10'></div>`;
	}

	static #FooterSingleSignString(id)
	{
return `\
<span id='${id}_Span' class='footer_single_sign'></span>`;
	}

	get #id() { return this.getAttribute('id'); }

	#footer_single_sign;
	#random_color_counter;
	#random_color_prev;

	#rss_news;
	#rss_news_sentence;
	#rss_news_char_index;
	#rss_news_sentence_index;
	#is_rss_news_ready;

	constructor()
	{
		super();

		this.className = 'selectable';

		this.insertAdjacentHTML('beforeend', FooterSingle.#FooterSingleVersionString());
		fetch('https://raw.githubusercontent.com/canerozdemircgi/website/main/version.txt').then(response => response.text()).then(response =>
		{
			document.getElementById('version_website').textContent = response;
		});

		this.insertAdjacentHTML('beforeend', FooterSingle.#FooterSingleSignString(this.#id));

		this.#footer_single_sign = document.getElementById(`${this.#id}_Span`);
		this.#random_color_counter = 0;

		const spans = [];
		for (let i = 0; i < 64; ++i)
			spans.push(this.#GenerateSignString());
		this.#footer_single_sign.insertAdjacentHTML('beforeend', spans.join(''));

		requestAnimationFrame(this.#RequestAnimationFrame.bind(this));

		this.#is_rss_news_ready = false;
		fetch('https://moxie.foxnews.com/google-publisher/latest.xml').then(response => response.text()).then(response =>
		{
			this.#rss_news = new DOMParser().parseFromString(response, 'application/xml').children[0].children[0].querySelectorAll('item');

			this.#rss_news_char_index = 0;
			this.#rss_news_sentence_index = 0;
			this.#rss_news_sentence = this.#GetRssNewsSentence();

			this.#is_rss_news_ready = true;
		});
	}

	#GetRssNewsSentence()
	{
		return ' ..... ' + this.#rss_news[this.#rss_news_sentence_index].querySelector('title').textContent;
	}

	#GenerateSignChar()
	{
		if (this.#is_rss_news_ready)
		{
			const result = this.#rss_news_sentence[this.#rss_news_char_index];
			this.#rss_news_char_index += 1;

			if (this.#rss_news_char_index >= this.#rss_news_sentence.length)
			{
				this.#rss_news_char_index = 0;
				this.#rss_news_sentence_index += 1;

				if (this.#rss_news_sentence_index >= this.#rss_news.length)
					this.#rss_news_sentence_index = 0;

				this.#rss_news_sentence = this.#GetRssNewsSentence();
			}

			return result;
		}

		if (Math.random() > 0.5)
			return '.';
		return FooterSingle.#alphabet.charAt(Math.floor(Math.random() * FooterSingle.#alphabet.length));
	}

	#GenerateSignColor()
	{
		if (this.#random_color_counter == 0)
		{
			this.#random_color_counter = GetRandomInt(8, 16);
			this.#random_color_prev = GetRandomRgb(128, 255, 32, 128, 128, 255);
		}
		--this.#random_color_counter;
		return this.#random_color_prev;
	}

	#GenerateSignString()
	{
return `\
<span style='color: ${this.#GenerateSignColor()}'>${this.#GenerateSignChar()}</span>`;
	}

	#RequestAnimationFrame()
	{
		setTimeout(this.#RefreshAnimation.bind(this), 200);
	}

	#RefreshAnimation()
	{
		this.#footer_single_sign.style.visibility = 'hidden';

		const sign_length_m1 = this.#footer_single_sign.children.length - 1;
		for (let i = 0; i < sign_length_m1; ++i)
			this.#footer_single_sign.children[i].textContent = this.#footer_single_sign.children[i + 1].textContent;
		this.#footer_single_sign.lastChild.textContent = this.#GenerateSignChar();

		this.#footer_single_sign.style.visibility = 'visible';

		requestAnimationFrame(this.#RequestAnimationFrame.bind(this));
	}
}
window.customElements.define('footer-single', FooterSingle);