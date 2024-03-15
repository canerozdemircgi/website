'use strict';

class CanvasStars extends HTMLElement
{
	static #CanvasStarsString(id)
	{
return `\
<canvas id='${id}_Canvas'></canvas>`;
	}

    #canvas;
    #worker;

	get #id() { return this.getAttribute('id'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', CanvasStars.#CanvasStarsString(this.#id));

        if (HTMLCanvasElement.prototype.transferControlToOffscreen)
        {
            this.#canvas = document.getElementById(`${this.#id}_Canvas`);
            const offscreen_canvas = this.#canvas.transferControlToOffscreen();
            this.#worker = new Worker('element/canvas-stars/canvas-stars_worker.js');
            this.#worker.postMessage(
            {
                msg: 'init',
                offsetWidth: this.#canvas.offsetWidth,
                offsetHeight: this.#canvas.offsetHeight,
                canvas: offscreen_canvas
            }, [offscreen_canvas]);

            setInterval(() =>
            {
                if (this.#canvas.width !== this.#canvas.offsetWidth || this.#canvas.height !== this.#canvas.offsetHeight)
                {
                    this.#worker.postMessage(
                    {
                        msg: 'resize',
                        offsetWidth: this.#canvas.offsetWidth,
                        offsetHeight: this.#canvas.offsetHeight,
                    });
                }
            }, 250);
        }
	}
}
window.customElements.define('canvas-stars', CanvasStars);