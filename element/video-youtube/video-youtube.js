'use strict';

class VideoYoutube extends HTMLElement
{
	static #VideoYoutubeString(identifier)
	{
return `\
<iframe class='video-youtube-iframe' src='https://www.youtube.com/embed/${identifier}' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`;
	}

	get #identifier() { return this.getAttribute('identifier'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', VideoYoutube.#VideoYoutubeString(this.#identifier));
	}
}
window.customElements.define('video-youtube', VideoYoutube);