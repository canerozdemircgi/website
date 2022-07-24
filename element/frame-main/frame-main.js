'use strict';

class FrameMain extends HTMLElement
{
	constructor() { super(); }

	async CreateElement()
	{
		if (window.menu_last.children.length !== 0)
		{
			this.parentElement.style.display = 'none';
			return;
		}
		this.parentElement.style.display = 'grid';

		const path_frame = `htm/${window.menu_last.path}/${window.menu_last.text}`;

		if (window.menu_last.loader === 'external')
		{
			this.#CreateElementExternal(path_frame);
			return;
		}

		Promise.all
		([
			fetch(`${path_frame}.css`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.htm`).then(response => response.ok ? response.text() : null),
			fetch(`${path_frame}.js`).then(response => response.ok ? response.text() : null)
		]).then(([css_frame, htm_frame, js_frame]) =>
		{
			const promise = fetch(`htm/${window.menu_last.path}/file-tree.json`).then(response => response.ok ? response.json() : Promise.reject());

			this.#CreateElementGeneric(css_frame, htm_frame, js_frame);

			return Promise.all([promise, Promise.resolve(htm_frame !== null)]);
		}).then(([file_tree, generic]) =>
		{
			file_tree.generic = generic;

			const promises = [];

			promises.push(file_tree.downloads === undefined
				? Promise.resolve(null)
				: Promise.all(file_tree.downloads.map(download => fetch(`htm/${window.menu_last.path}/Downloads/${download.description}`).then(response => response.ok ? response.text() : null)))
			);

			promises.push(file_tree.images === undefined
				? Promise.resolve(null)
				: Promise.all([
					Promise.all(file_tree.images.map(image => fetch(`htm/${window.menu_last.path}/Images/${image}-UP.htm`).then(response => response.ok ? response.text() : null))),
					Promise.all(file_tree.images.map(image => fetch(`htm/${window.menu_last.path}/Images/${image}-DW.htm`).then(response => response.ok ? response.text() : null)))
				])
			);

			promises.push(file_tree.videos === undefined
				? Promise.resolve(null)
				: Promise.all([
					Promise.all(file_tree.videos.map(video => fetch(`htm/${window.menu_last.path}/Videos/${video.title}-UP.htm`).then(response => response.ok ? response.text() : null))),
					Promise.all(file_tree.videos.map(video => fetch(`htm/${window.menu_last.path}/Videos/${video.title}-DW.htm`).then(response => response.ok ? response.text() : null)))
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
			});
		}).catch(() => {});
	}

	async RefreshElement()
	{
		while (this.parentElement.childNodes.length > 3)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}

	#CreateElementExternal(path_frame)
	{
		this.parentElement.insertAdjacentHTML('beforeend', `<iframe src='${path_frame}.html' onload='iFrameResize({heightCalculationMethod: "lowestElement", bodyMargin: 0, bodyBackground: "transparent"}, this);'></iframe>`);
	}

	#CreateElementGeneric(css_frame, htm_frame, js_frame)
	{
		if (css_frame !== null)
			this.parentElement.insertAdjacentHTML('beforeend', `<style>${css_frame}</style>`);

		if (htm_frame !== null)
			this.parentElement.insertAdjacentHTML('beforeend', htm_frame);

		if (js_frame !== null)
		{
			const script = document.createElement('script');
			script.insertAdjacentHTML('beforeend', `{${js_frame}}`);
			this.parentElement.appendChild(script);
		}
	}

	#CreateElementDownload(file_tree, download_descriptions)
	{
		const result = [];
		if (file_tree.generic)
			result.push(`<br class='br10'>`);

		result.push(`<span class='selectable'>`);
		for (let i = 0;;)
		{
			result.push(`<a is='href-text' href='${file_tree.downloads[i].url}'>${file_tree.downloads[i].label}</a>`);
			if (download_descriptions[i] !== null)
				result.push(`<br class='br10'>${download_descriptions[i]}`);

			if (++i < file_tree.downloads.length)
				result.push(`<br class='br10'>`);
			else
				break;
		}
		result.push('</span>');

		this.parentElement.insertAdjacentHTML('beforeend', result.join(''));
	}

	#CreateElementImage(file_tree, image_descriptions_up, image_descriptions_dw)
	{
		let result = [];
		if (file_tree.generic || file_tree.downloads !== undefined)
			result.push(`<br class='br10'>`);

		let image_pager, image_offset, image_limit;
		if (file_tree.images.length > 10)
		{
			result.push(`\
<limiter-page_items id='image_pager' param='image' items_max='${file_tree.images.length}' element_height='40px'></limiter-page_items>
<br class='br00'>
<separator-natty horizontal></separator-natty>
<br class='br00'>`);
			this.parentElement.insertAdjacentHTML('beforeend', result.join(''));
			result = [];

			image_pager = document.getElementById('image_pager');
			image_offset = image_pager.offset;
			image_limit = image_pager.limit;
		} else
		{
			image_offset = 0;
			image_limit = file_tree.images.length;
		}

		result.push(`<span id='image_pager_span' class='selectable'>`);
		for (let i = image_offset;;)
		{
			if (image_descriptions_up[i] !== null)
				result.push(`<span-description type='up'>${image_descriptions_up[i]}</span-description>`);
			const href = `htm/${window.menu_last.path}/Images/${file_tree.images[i]}`;
			const href_redirect = GetHrefWithRedirect(href);
			result.push(`<a href='${href_redirect}'><img src='${href}'></a>`);
			if (image_descriptions_dw[i] !== null)
				result.push(`<span-description type='dw'>${image_descriptions_dw[i]}</span-description>`);

			if (++i < image_limit)
				result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
			else
				break;
		}
		result.push('</span>');

		this.parentElement.insertAdjacentHTML('beforeend', result.join(''));

		if (file_tree.images.length > 10)
		{
			const image_pager_span = document.getElementById('image_pager_span');
			image_pager.SignalRefresh = () => document.getElementById('image_pager').SignalRefresh_();
			image_pager.SignalRefresh_ = () =>
			{
				while (image_pager_span.childNodes.length > 0)
					image_pager_span.lastChild.remove();

				image_pager.RefreshElement();
				image_offset = image_pager.offset;
				image_limit = image_pager.limit;

				const result = [];
				for (let i = image_offset;;)
				{
					if (image_descriptions_up[i] !== null)
						result.push(`<span-description type='up'>${image_descriptions_up[i]}</span-description>`);
					const href = `htm/${window.menu_last.path}/Images/${file_tree.images[i]}`;
					const href_redirect = GetHrefWithRedirect(href);
					result.push(`<a href='${href_redirect}'><img src='${href}'></a>`);
					if (image_descriptions_dw[i] !== null)
						result.push(`<span-description type='dw'>${image_descriptions_dw[i]}</span-description>`);

					if (++i < image_limit)
						result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
					else
						break;
				}
				image_pager_span.insertAdjacentHTML('beforeend', result.join(''));
			};
		}
	}

	#CreateElementVideo(file_tree, video_descriptions_up, video_descriptions_dw)
	{
		let result = [];
		if (file_tree.generic || file_tree.downloads !== undefined || file_tree.images !== undefined)
			result.push(`<br class='br10'>`);

		let video_pager, video_offset, video_limit;
		if (file_tree.videos.length > 10)
		{
			result.push(`\
<limiter-page_items id='video_pager' param='video' items_max='${file_tree.videos.length}' element_height='40px'></limiter-page_items>
<br class='br00'>
<separator-natty horizontal></separator-natty>
<br class='br00'>`);
			this.parentElement.insertAdjacentHTML('beforeend', result.join(''));
			result = [];

			video_pager = document.getElementById('video_pager');
			video_offset = video_pager.offset;
			video_limit = video_pager.limit;
		} else
		{
			video_offset = 0;
			video_limit = file_tree.videos.length;
		}

		result.push(`<span id='video_pager_span' class='selectable'>`);
		for (let i = video_offset;;)
		{
			if (video_descriptions_up[i] !== null)
				result.push(`<span-description type='up'>${video_descriptions_up[i]}</span-description>`);
			result.push(`<video-youtube identifier='${file_tree.videos[i].identifier}'></video-youtube>`);
			if (video_descriptions_dw[i] !== null)
				result.push(`<span-description type='dw'>${video_descriptions_dw[i]}</span-description>`);

			if (++i < video_limit)
				result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
			else
				break;
		}
		result.push('</span>');

		this.parentElement.insertAdjacentHTML('beforeend', result.join(''));

		if (file_tree.videos.length > 10)
		{
			const video_pager_span = document.getElementById('video_pager_span');
			video_pager.SignalRefresh = () => document.getElementById('video_pager').SignalRefresh_();
			video_pager.SignalRefresh_ = () =>
			{
				while (video_pager_span.childNodes.length > 0)
					video_pager_span.lastChild.remove();

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
						result.push(`<br class='br20'><separator-natty horizontal circle></separator-natty><br class='br20'>`);
					else
						break;
				}
				video_pager_span.insertAdjacentHTML('beforeend', result.join(''));
			};
		}
	}
}
window.customElements.define('frame-main', FrameMain);