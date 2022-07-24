'use strict';

class CanvasStars extends HTMLElement
{
	static #CanvasStarsString(id)
	{
return `\
<canvas id='${id}_Canvas'></canvas>`;
	}

	get #id() { return this.getAttribute('id'); }

	constructor()
	{
		super();
		
		this.insertAdjacentHTML('beforeend', CanvasStars.#CanvasStarsString(this.#id));

		const canvas = document.getElementById(`${this.#id}_Canvas`);
		const canvas_context = canvas.getContext('2d');

		const callback = () =>
		{
			if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight)
			{
				canvas.width = canvas.offsetWidth;
				canvas.height = canvas.offsetHeight;

				const stars_count = canvas.width * canvas.height / (1024 * 1.25 * 1.25);
				for (let i = 0; i < stars_count; ++i)
				{
					const x = Math.random() * canvas.width;
					const y = Math.random() * canvas.height;
					const radius = Math.random() * 1.25;

					const startAngle = Math.random() * Math.PI * 2;
					const endAngle = Math.random() * Math.PI * 2;
					const isClockwise = Math.random() > 0.5;

					const h = GetRandomInt(0, 360);
					const s = GetRandomInt(50, 100);
					const l = GetRandomInt(75, 100);

					canvas_context.beginPath();
					canvas_context.arc(x, y, radius, startAngle, endAngle, isClockwise);
					canvas_context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
					canvas_context.fill();
				}
			}
			setTimeout(callback, 1000);
		};
		setTimeoutImmediate(callback, 1000);
	}
}
window.customElements.define('canvas-stars', CanvasStars);