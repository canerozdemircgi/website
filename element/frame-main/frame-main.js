'use strict';

class FrameMain extends HTMLElement
{
	constructor() { super(); }

	async CreateElement()
	{
		if (window.menu_last.children.length !== 0)
		{
			this.style.display = 'none';
			return;
		}

		const path_frame = `htm/${window.menu_last.path}/${window.menu_last.text}`;

		if (window?.menu_last?.loader === 'external')
		{
			this.style.display = 'unset';
			this.#CreateElementExternal(path_frame);
			return;
		}

		this.style.display = 'grid';

		Promise.all
		([
			fetch(`${path_frame}.css`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.htm`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.js`).then(response => response.ok ? response.text() : null)
		]).then(([css_frame, htm_frame, js_frame]) =>
		{
			const promise = fetch(`htm/${window.menu_last.path}/_file-tree.json`).then(response => response.ok ? response.json() : Promise.reject());

			this.#CreateElementGeneric(css_frame, htm_frame);

			return Promise.all([promise, Promise.resolve(htm_frame !== null), Promise.resolve(js_frame)]);
		}).then(([file_tree, generic, js_frame]) =>
		{
			file_tree.generic = generic;

			const promises = [];

			promises.push(file_tree.downloads === undefined
				? Promise.resolve(null)
				: Promise.all(file_tree.downloads.map(download => fetch(`htm/${window.menu_last.path}/Download/${download.description}`).then(response => response.ok ? response.text() : null)))
			);

			promises.push(file_tree.images === undefined
				? Promise.resolve(null)
				: Promise.all([
					Promise.all(file_tree.images.map(image => fetch(`htm/${window.menu_last.path}/Image/${image}-UP.htm`).then(response => response.ok ? response.text() : null))),
					Promise.all(file_tree.images.map(image => fetch(`htm/${window.menu_last.path}/Image/${image}-DW.htm`).then(response => response.ok ? response.text() : null)))
				])
			);

			promises.push(file_tree.videos === undefined
				? Promise.resolve(null)
				: Promise.all([
					Promise.all(file_tree.videos.map(video => fetch(`htm/${window.menu_last.path}/Video/${video.title}-UP.htm`).then(response => response.ok ? response.text() : null))),
					Promise.all(file_tree.videos.map(video => fetch(`htm/${window.menu_last.path}/Video/${video.title}-DW.htm`).then(response => response.ok ? response.text() : null)))
				])
			);

			return Promise.all(promises).then(responses =>
			{
				if (responses[0] !== null)
					this.#CreateElementDownload(file_tree, responses[0]);

				if (responses[1] !== null)
					this.#CreateElementImage(file_tree, responses[1][0], responses[1][1]);

				if (responses[2] !== null)
					this.#CreateElementVideo(file_tree, responses[2][0], responses[2][1]);

				this.#CreateElementScript(js_frame);
			});
		}).catch(() => {});
	}

	async RefreshElement()
	{
		this.replaceChildren();
		this.CreateElement();
	}

	#CreateElementExternal(path_frame)
	{
		requestIdleCallback(() => window.location.replace(`${path_frame}.html`));
		// this.insertAdjacentHTML('beforeend', `<iframe src='${path_frame}.html' onload='iFrameResize({heightCalculationMethod: "max", scrolling: true, bodyMargin: 0, bodyBackground: "transparent"}, this);'></iframe>`);
	}

	#CreateElementGeneric(css_frame, htm_frame)
	{
		if (css_frame !== null)
			this.insertAdjacentHTML('beforeend', `<style>${css_frame}</style>`);

		if (htm_frame !== null)
			this.insertAdjacentHTML('beforeend', htm_frame);
	}

	#CreateElementScript(js_frame)
	{
		if (js_frame !== null)
		{
			const script = document.createElement('script');
			script.insertAdjacentHTML('beforeend', `{${js_frame}}`);
			this.appendChild(script);
		}
	}

	#CreateElementDownload(file_tree, download_descriptions)
	{
		const result = [];
		if (file_tree.generic)
			result.push(`<div class='br10'></div>`);

		result.push(`<span class='frame-main-container selectable'>`);
		for (let i = 0;;)
		{
			const url_type = file_tree.downloads[i].url_type === undefined ? 'ocean' : file_tree.downloads[i].url_type;

			if (file_tree.downloads[i].label_pre !== undefined)
				result.push(`<span>${file_tree.downloads[i].label_pre}</span>`);
			result.push(`<href-main type='${url_type}' href='${file_tree.downloads[i].url}'>${file_tree.downloads[i].label}</href-main>`);
			if (file_tree.downloads[i].label_post !== undefined)
				result.push(`<span>${file_tree.downloads[i].label_post}</span>`);

			if (download_descriptions[i] !== null)
				result.push(`<div class='br10'></div>${download_descriptions[i]}`);

			if (++i < file_tree.downloads.length)
				result.push(`<div class='br10'></div>`);
			else
				break;
		}
		result.push('</span>');

		this.insertAdjacentHTML('beforeend', result.join(''));
	}

	#CreateElementImage(file_tree, image_descriptions_up, image_descriptions_dw)
	{
		let result = [];
		if (file_tree.generic || file_tree.downloads !== undefined)
			result.push(`<div class='br10'></div>`);

		let image_pager, image_offset, image_limit;
		if (file_tree.images.length > 10)
		{
			result.push(`\
<limiter-page_items id='image_pager' param='image' items_max='${file_tree.images.length}' element_height='40px'></limiter-page_items>
<div class='br00'></div>
<separator-natty horizontal></separator-natty>
<div class='br00'></div>`);
			this.insertAdjacentHTML('beforeend', result.join(''));
			result = [];

			image_pager = document.getElementById('image_pager');
			image_offset = image_pager.offset;
			image_limit = image_pager.limit;
		} else
		{
			image_offset = 0;
			image_limit = file_tree.images.length;
		}

		result.push(`<span id='image_pager_div' class='frame-main-container selectable'>`);
		for (let i = image_offset;;)
		{
			if (image_descriptions_up[i] !== null)
				result.push(`<span-description type='up'>${image_descriptions_up[i]}</span-description>`);
			const href = `htm/${window.menu_last.path}/Image/${file_tree.images[i]}`;
			const href_redirect = GetHrefWithRedirect(href);
			result.push(`<div class='br00'></div><a href='${href_redirect}'><img src='${href}'></a>`);
			if (image_descriptions_dw[i] !== null)
				result.push(`<span-description type='dw'>${image_descriptions_dw[i]}</span-description>`);

			if (++i < image_limit)
				result.push(`<div class='br20'></div><separator-natty horizontal circle></separator-natty><div class='br20'></div>`);
			else
				break;
		}
		result.push('</span>');

		this.insertAdjacentHTML('beforeend', result.join(''));

		if (file_tree.images.length > 10)
		{
			const image_pager_div = document.getElementById('image_pager_div');
			image_pager.SignalRefresh = () => document.getElementById('image_pager').SignalRefresh_();
			image_pager.SignalRefresh_ = () =>
			{
				while (image_pager_div.childNodes.length > 0)
					image_pager_div.lastChild.remove();

				image_pager.RefreshElement();
				image_offset = image_pager.offset;
				image_limit = image_pager.limit;

				const result = [];
				for (let i = image_offset;;)
				{
					if (image_descriptions_up[i] !== null)
						result.push(`<span-description type='up'>${image_descriptions_up[i]}</span-description>`);
					const href = `htm/${window.menu_last.path}/Image/${file_tree.images[i]}`;
					const href_redirect = GetHrefWithRedirect(href);
					result.push(`<div class='br00'></div><a href='${href_redirect}'><img src='${href}'></a>`);
					if (image_descriptions_dw[i] !== null)
						result.push(`<span-description type='dw'>${image_descriptions_dw[i]}</span-description>`);

					if (++i < image_limit)
						result.push(`<div class='br20'></div><separator-natty horizontal circle></separator-natty><div class='br20'></div>`);
					else
						break;
				}
				image_pager_div.insertAdjacentHTML('beforeend', result.join(''));
			};
		}
	}

	#CreateElementVideo(file_tree, video_descriptions_up, video_descriptions_dw)
	{
		let result = [];
		if (file_tree.generic || file_tree.downloads !== undefined || file_tree.images !== undefined)
			result.push(`<div class='br10'></div>`);

		let video_pager, video_offset, video_limit;
		if (file_tree.videos.length > 10)
		{
			result.push(`\
<limiter-page_items id='video_pager' param='video' items_max='${file_tree.videos.length}' element_height='40px'></limiter-page_items>
<div class='br00'></div>
<separator-natty horizontal></separator-natty>
<div class='br00'></div>`);
			this.insertAdjacentHTML('beforeend', result.join(''));
			result = [];

			video_pager = document.getElementById('video_pager');
			video_offset = video_pager.offset;
			video_limit = video_pager.limit;
		} else
		{
			video_offset = 0;
			video_limit = file_tree.videos.length;
		}

		result.push(`<span id='video_pager_div' class='frame-main-container selectable'>`);
		for (let i = video_offset;;)
		{
			if (video_descriptions_up[i] !== null)
				result.push(`<span-description type='up'>${video_descriptions_up[i]}</span-description>`);
			result.push(`<video-youtube identifier='${file_tree.videos[i].identifier}'></video-youtube>`);
			if (video_descriptions_dw[i] !== null)
				result.push(`<span-description type='dw'>${video_descriptions_dw[i]}</span-description>`);

			if (++i < video_limit)
				result.push(`<div class='br20'></div><separator-natty horizontal circle></separator-natty><div class='br20'></div>`);
			else
				break;
		}
		result.push('</span>');

		this.insertAdjacentHTML('beforeend', result.join(''));

		if (file_tree.videos.length > 10)
		{
			const video_pager_div = document.getElementById('video_pager_div');
			video_pager.SignalRefresh = () => document.getElementById('video_pager').SignalRefresh_();
			video_pager.SignalRefresh_ = () =>
			{
				while (video_pager_div.childNodes.length > 0)
					video_pager_div.lastChild.remove();

				video_pager.RefreshElement();
				video_offset = video_pager.offset;
				video_limit = video_pager.limit;

				const result = [];
				for (let i = video_offset;;)
				{
					if (video_descriptions_up[i] !== null)
						result.push(`<span-description type='up'>${video_descriptions_up[i]}</span-description>`);
					result.push(`<video-youtube identifier='${file_tree.videos[i].identifier}'></video-youtube>`);
					if (video_descriptions_dw[i] !== null)
						result.push(`<span-description type='dw'>${video_descriptions_dw[i]}</span-description>`);

					if (++i < video_limit)
						result.push(`<div class='br20'></div><separator-natty horizontal circle></separator-natty><div class='br20'></div>`);
					else
						break;
				}
				video_pager_div.insertAdjacentHTML('beforeend', result.join(''));
			};
		}
	}
}
window.customElements.define('frame-main', FrameMain);