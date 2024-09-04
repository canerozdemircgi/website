'use strict';

const GetRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const GetRandomFloat = (min, max) => Math.random() * (max - min) + min;
const GetRandomColor = (rMin, rMax, gMin, gMax, bMin, bMax) =>
{
	const r = GetRandomInt(rMin, rMax);
	const g = GetRandomInt(gMin, gMax);
	const b = GetRandomInt(bMin, bMax);
	return `rgb(${r}, ${g}, ${b})`;
};
const GetRandomSelect = inputs => inputs[Math.floor(Math.random() * inputs.length)];

const promise_menu_tree = fetch('data/menu-tree.json').then(response => response.json());

const HrefParameterMode =
{
	stratch: 0,
	append: 1,
	override: 2
};
const GetHrefWithParameters = (href, parameters, href_parameter_mode) =>
{
	let href_parameters = '';
	const index_href_parameters = href.indexOf('?');
	if (index_href_parameters >= 0)
	{
		href_parameters = href.substring(index_href_parameters);
		href = href.substring(0, index_href_parameters);
	}

	let url_search = '';
	switch (href_parameter_mode)
	{
		case HrefParameterMode.stratch:
			url_search = new URLSearchParams();
			for (const item of Object.keys(parameters))
				url_search.set(item, parameters[item]);
			break;

		case HrefParameterMode.append:
			url_search = new URLSearchParams(href_parameters);
			for (const item of Object.keys(parameters))
			{
				if (url_search.get(item) === null)
					url_search.set(item, parameters[item]);
			}
			break;

		case HrefParameterMode.override:
			url_search = new URLSearchParams(href_parameters);
			for (const item of Object.keys(parameters))
				url_search.set(item, parameters[item]);
			break;
	}

	return `${href}?${decodeURIComponent(url_search.toString().replace(/\+/g, ' '))}`;
};
const GetHrefWithRedirect = href => href.includes('path=') ? href : `${window.location.origin + window.location.pathname.replace('index.html', '')}redirect.html?address=${href}`;

const RefreshPage = () =>
{
	window.menu_tree_indexes = ReturnMenuTreeIndexes();
	window.menu_last = ReturnMenuLast();

	button_path_main.RefreshElement();
	title_top_main.RefreshElement();
	button_branch_main.RefreshElement();
	frame_main_main.RefreshElement();
};

const ReturnMenuTreeIndexes = () =>
{
	const searchParams = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams;
	if (searchParams.has('path'))
	{
		let path = searchParams.get('path').replaceAll('_', ' ');

		if (path.charAt(0) === '/')
			path = path.substring(1);
		const path_length0 = path.length - 1;
		if (path.charAt(path_length0) === '/')
			path = path.substring(0, path_length0);

		return CheckMenuTreeIndexesRecursive(path, window.menu_tree.children) || [1, 0];
	}
	else
		return [0];
};
const CheckMenuTreeIndexesRecursive = (path, menu_tree_children) =>
{
	for (let i = 0; i < menu_tree_children.length; ++i)
	{
		const result = CheckMenuTreeIndexesRecursive(path, menu_tree_children[i].children);
		if (result !== null)
			return [i].concat(result);
		else if (menu_tree_children[i].path === path)
			return [i];
	}
	return null;
};
const ReturnMenuLast = () =>
{
	let element = window.menu_tree;
	for (let i = 0; i < window.menu_tree_indexes.length; ++i)
		element = element.children[window.menu_tree_indexes[i]];
	return element;
};

const NavigatePage = (href, Refresh = RefreshPage) =>
{
	history.pushState(String(Refresh), '', href);
	Refresh();

	WriteJournal();
};
window.addEventListener('popstate', event =>
{
	if (event.state === null || event.state === '')
		RefreshPage();
	else
	{
		const Refresh = eval(event.state);
		Refresh();
	}

	WriteJournal();
});
window.addEventListener('pageshow', event =>
{
	if (event.persisted)
		WriteJournal();
});

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

		if (new URL(window.location.href.replace(/\+/g, '%2B')).searchParams.has('no_anims'))
			return;

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

class HeaderDouble extends HTMLElement
{
	static #HeaderDoubleString(text1, text2)
	{
return `\
<a href='${GetHrefWithParameters(window.location.href, {path: window.menu_tree.children[0].path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false;'>
	<span class='header-double-1'>${text1}</span>
	<div class='br00'></div>
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

		setInterval(this.#RefreshAnimation.bind(this), 250);
	}

	#RefreshAnimation()
	{
		// this.style.visibility = 'hidden';

		if (Math.random() > 0.25)
			this.classList.add('header-double-light');
		else
			this.classList.remove('header-double-light');

		// this.style.visibility = 'visible';
	}
}
window.customElements.define('header-double', HeaderDouble);

class GridFlexible extends HTMLElement
{
	get #element_width() { return this.getAttribute('element_width'); }
	get #element_height() { return this.getAttribute('element_height'); }
	get #element_gap() { return this.getAttribute('element_gap'); }

	constructor()
	{
		super();

		this.style.gridTemplateColumns = `repeat(auto-fit, ${this.#element_width})`;
		this.style.gridAutoRows = this.#element_height;
		this.style.gap = this.#element_gap;
	}
}
window.customElements.define('grid-flexible', GridFlexible);

class FieldsetElliptic extends HTMLElement
{
	static #FieldsetEllipticString(legend)
	{
return `\
<fieldset class='fieldset-elliptic'>
	<legend class='fieldset-elliptic-legend'>${legend}</legend>
</fieldset>`;
	}

	constructor()
	{
		super();

		const innerHTML = `${this.innerHTML}`;
		this.innerHTML = null;

		this.insertAdjacentHTML('afterbegin', FieldsetElliptic.#FieldsetEllipticString(innerHTML));
	}
}
window.customElements.define('fieldset-elliptic', FieldsetElliptic);

class SeparatorNatty extends HTMLElement
{
	static #SeparatorNattyHorizontalString()
	{
return `\
<span class='separator-natty-line-horizontal'></span>
<span class='separator-natty-circle'></span>
<span class='separator-natty-line-horizontal'></span>`;
	}

	static #SeparatorNattyVerticalString()
	{
return `\
<span class='separator-natty-line-vertical'></span>
<span class='separator-natty-circle'></span>
<span class='separator-natty-line-vertical'></span>`;
	}

	get #horizontal() { return this.hasAttribute('horizontal'); }
	get #vertical() { return this.hasAttribute('vertical'); }
	get #circle() { return this.hasAttribute('circle'); }

	constructor()
	{
		super();

		if (this.#circle)
		{
			if (this.#horizontal)
			{
				this.className = 'separator-natty-horizontal';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.#SeparatorNattyHorizontalString());
			}
			else if (this.#vertical)
			{
				this.className = 'separator-natty-vertical';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.#SeparatorNattyVerticalString());
			}
		}
		else
		{
			if (this.#horizontal)
				this.className = 'separator-natty-line-horizontal';
			else if (this.#vertical)
				this.className = 'separator-natty-line-vertical';
		}
	}
}
window.customElements.define('separator-natty', SeparatorNatty);

class LabelHalf extends HTMLElement
{
	static #LabelHalfUnlitString()
	{
return `\
<span class='label-half-tail unselectable'>=</span>`;
	}

	static #LabelHalfNeonString(neon)
	{
return `\
<span class='label-half-neon' style='filter: drop-shadow(0 0 2px ${neon}) drop-shadow(0 0 4px ${neon});'></span>
<span class='label-half-tail unselectable'>=</span>`;
	}

	get #is_neon() { return this.hasAttribute('neon'); }
	get #neon() { return this.getAttribute('neon'); }

	constructor()
	{
		super();

		if (this.#is_neon)
		{
			this.className = 'selectable';
			this.insertAdjacentHTML('beforeend', LabelHalf.#LabelHalfNeonString(this.#neon));
		}
		else
		{
			this.className = 'label-half-unlit selectable';
			this.insertAdjacentHTML('beforeend', LabelHalf.#LabelHalfUnlitString());
		}
	}
}
window.customElements.define('label-half', LabelHalf);

class LabelFull extends HTMLElement
{
	static #LabelFullString(id, label, value)
	{
return `\
<span>${label}</span>
<span class='label-full-tail unselectable'>=</span>
<span id='${id}_LabelFull_Value'>${value}</span>`;
	}

	get #id() { return this.getAttribute('id'); }
	get #label() { return this.getAttribute('label'); }

	get value() { return this.getAttribute('value'); }
	set value(value) { this.setAttribute('value', value); }

	#node_value;

	constructor()
	{
		super();

		this.className = 'selectable';
		this.insertAdjacentHTML('beforeend', LabelFull.#LabelFullString(this.#id, this.#label, this.value));

		this.#node_value = document.getElementById(`${this.#id}_LabelFull_Value`);
	}

	static get observedAttributes() { return ['value']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		if (attribute === 'value')
			this.#node_value.textContent = value_new;
	}
}
window.customElements.define('label-full', LabelFull);

class SpanDescription extends HTMLElement
{
	get #type() { return this.getAttribute('type'); }

	constructor()
	{
		super();

		switch (this.#type)
		{
			case 'up':
				this.className = 'span-description-up';
				break;

			case 'dw':
				this.className = 'span-description-dw';
				break;
		}
	}
}
window.customElements.define('span-description', SpanDescription);

class HrefMain extends HTMLElement
{
	static #HrefMainString(id, href, text)
	{
return `\
<a id='${id}_Href' class='selectable' href='${href}'>${text}</a>`;
	}

	get #id() { return this.getAttribute('id'); }
	set #id(value) { this.setAttribute('id', value); }

	get #type() { return this.getAttribute('type'); }

	get href() { return this.getAttribute('href'); }
	set href(value) { this.setAttribute('href', value); }

	#node_href;

	constructor()
	{
		super();

		if (this.#id === null)
			this.#id = Date.now().toString(36) + Math.random().toString(36).replace('.', '');

		if (this.innerHTML === '')
			this.innerHTML = this.href;
		this.href = GetHrefWithRedirect(this.href);

		const innerHTML = `${this.innerHTML}`;
		this.innerHTML = null;
		this.insertAdjacentHTML('beforeend', HrefMain.#HrefMainString(this.#id, this.href, innerHTML));

		this.#node_href = document.getElementById(`${this.#id}_Href`);

		this.#node_href.classList.add(`href-${this.#type}`);

		if (this.#node_href.host !== window.location.host || this.href.indexOf('redirect.html?address=') >= 0)
			this.#node_href.setAttribute('target', '_blank');
	}

	static get observedAttributes() { return ['href']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		switch (attribute)
		{
			case 'href':
				this.#node_href.href = this.href;
				break;
		}
	}
}
window.customElements.define('href-main', HrefMain);

class InputText extends HTMLElement
{
	static #InputTextString(id, value)
	{
return `\
<input id='${id}_InputText_Input' class='input-text' type='text' value='${value}'>`;
	}

	get #id() { return this.getAttribute('id'); }

	get value() { return this.getAttribute('value'); }
	set value(value) { this.setAttribute('value', value); }

	#node_input;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', InputText.#InputTextString(this.#id, this.value));

		this.#node_input = document.getElementById(`${this.#id}_InputText_Input`);
		this.#node_input.addEventListener('change', () =>
		{
			this.value = this.#node_input.value;
			this.SignalRefresh();
		});
	}
}
window.customElements.define('input-text', InputText);

class InputInt extends HTMLElement
{
	static #InputIntString(id, value, width_input, width_button)
	{
return `\
<button id='${id}_InputInt_ButtonB' class='input-int-button-b' style='width: ${width_button};'>
	<svg class='input-int-img' width='10' height='10'>
		<use href='resource/button/Caret - Left.svg#$Caret - Left'></use>
	</svg>
</button>
<input id='${id}_InputInt_Input' class='input-int-input' type='text' value='${value}' style='width: ${width_input};'>
<button id='${id}_InputInt_ButtonN' class='input-int-button-n' style='width: ${width_button};'>
	<svg class='input-int-img' width='10' height='10'>
		<use href='resource/button/Caret - Right.svg#$Caret - Right'></use>
	</svg>
</button>`;
	}

	get #id() { return this.getAttribute('id'); }

	get value() { return parseInt(this.getAttribute('value')); }
	set value(value) { this.setAttribute('value', value); }

	get #value_default() { return parseInt(this.getAttribute('value_default')); }
	get value_min() { return parseInt(this.getAttribute('value_min')); }
	get value_max() { return parseInt(this.getAttribute('value_max')); }
	set value_max(value) { this.setAttribute('value_max', value); }

	get #width_input() { return this.getAttribute('width_input'); }
	get #width_button() { return this.getAttribute('width_button'); }

	#node_button_b;
	#node_input;
	#node_button_n;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', InputInt.#InputIntString(this.#id, this.value, this.#width_input, this.#width_button));

		this.#node_button_b = document.getElementById(`${this.#id}_InputInt_ButtonB`);
		this.#node_button_b.addEventListener('click', () => { this.value -= 1; });

		this.#node_input = document.getElementById(`${this.#id}_InputInt_Input`);
		this.#node_input.addEventListener('change', () => { this.value = this.#node_input.value; });

		this.#node_button_n = document.getElementById(`${this.#id}_InputInt_ButtonN`);
		this.#node_button_n.addEventListener('click', () => { this.value += 1; });
	}

	static get observedAttributes() { return ['value', 'value_min', 'value_max']; }
	attributeChangedCallback(attribute, value_old, value_new)
	{
		if (value_old === value_new)
			return;

		switch (attribute)
		{
			case 'value':
				if (isNaN(this.value))
				{
					this.value = this.#value_default;
					return;
				}
				else if (this.value < this.value_min)
				{
					this.value = this.value_min;
					return;
				}
				else if (this.value > this.value_max)
				{
					this.value = this.value_max;
					return;
				}

				switch (this.value)
				{
					case this.value_min:
						this.#node_button_b.disabled = true;
						this.#node_button_n.disabled = false;
						break;

					case this.value_max:
						this.#node_button_b.disabled = false;
						this.#node_button_n.disabled = true;
						break;

					default:
						this.#node_button_b.disabled = false;
						this.#node_button_n.disabled = false;
				}

				this.#node_input.value = this.value;
				this.SignalRefresh();
				break;

			case 'value_min':
				if (this.value < this.value_min)
					this.value = this.value_min;
				this.#node_button_b.disabled = this.value === this.value_min;
				break;

			case 'value_max':
				if (this.value > this.value_max)
					this.value = this.value_max;
				this.#node_button_n.disabled = this.value === this.value_max;
				break;
		}
	}
}
window.customElements.define('input-int', InputInt);

class LimiterPageItems extends HTMLElement
{
	static #LimiterPageItemsString(id, items_max, element_height)
	{
return `\
<span class='limiter-page_items-top' style='grid-auto-rows: ${element_height};'>
	<label-half style='width: 75px;'>Page</label-half>
	<input-int id='${id}_Page_InputInt' value='1' value_default='1' value_min='1' value_max='999' width_input='50px' width_button='40px'></input-int>
	<label-half style='width: 75px;'>Items</label-half>
	<input-int id='${id}_Items_InputInt' value='10' value_default='10' value_min='1' value_max='${items_max}' width_input='50px' width_button='40px'></input-int>
</span>
<span class='limiter-page_items-bottom' style='grid-auto-rows: ${element_height};'>
	<label-full id='${id}_Shown_LabelFull' label='Shown' value='0 - 0' style='width: 170px;'></label-full>
	<label-full label='Count' value='${items_max}' style='width: 120px;'></label-full>
	<href-main id='${id}_Refresh_HrefButton' type='button' href='' style='width: 130px;'>Refresh</href-main>
</span>`;
	}

	get #id() { return this.getAttribute('id'); }
	get #param() { return this.getAttribute('param'); }
	get #items_max() { return parseInt(this.getAttribute('items_max')); }
	get #element_height() { return this.getAttribute('element_height'); }

	get #page() { return this.#node_page.value; }
	set #page(value) { this.#node_page.value = value; }
	get #items() { return this.#node_items.value; }
	set #items(value) { this.#node_items.value = value; }

	get offset() { return (this.#page - 1) * this.#items; }
	get limit() { return Math.min(this.#page * this.#items, this.#items_max); }

	#node_page;
	#node_items;
	#node_shown;
	#node_refresh;

	#param_items_key;
	#param_page_key;

	constructor()
	{
		super();

		this.SignalRefresh = () => {};
		this.insertAdjacentHTML('beforeend', LimiterPageItems.#LimiterPageItemsString(this.#id, this.#items_max, this.#element_height));

		this.#node_page = document.getElementById(`${this.#id}_Page_InputInt`);
		this.#node_items = document.getElementById(`${this.#id}_Items_InputInt`);
		this.#node_shown = document.getElementById(`${this.#id}_Shown_LabelFull`);
		this.#node_refresh = document.getElementById(`${this.#id}_Refresh_HrefButton`);

		this.#param_items_key = `${this.#param}_items`;
		this.#param_page_key = `${this.#param}_page`;

		this.RefreshElement();

		this.#node_page.SignalRefresh = () =>
		{
			this.#node_refresh.href = GetHrefWithParameters(this.#node_refresh.href, {[this.#param_page_key]: this.#page}, HrefParameterMode.override);
		};
		this.#node_items.SignalRefresh = () =>
		{
			this.#node_refresh.href = GetHrefWithParameters(this.#node_refresh.href, {[this.#param_items_key]: this.#items}, HrefParameterMode.override);
			this.#node_page.value_max = Math.ceil(this.#items_max / this.#items);
		};

		this.#node_refresh.onclick = () =>
		{
			this.#node_shown.value = `${this.offset + 1} - ${this.limit}`;

			NavigatePage(this.#node_refresh.href, this.SignalRefresh);
			return false;
		};
	}

	RefreshElement()
	{
		const param_all = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams;
		const param_items = param_all.get(this.#param_items_key);
		const param_page = param_all.get(this.#param_page_key);
		if (param_items !== null)
			this.#items = param_items;
		this.#node_page.value_max = Math.ceil(this.#items_max / this.#items);
		if (param_page !== null)
			this.#page = param_page;

		this.#node_shown.value = `${this.offset + 1} - ${this.limit}`;
		this.#node_refresh.href = GetHrefWithParameters(window.location.href, {[this.#param_items_key]: this.#items, [this.#param_page_key]: this.#page}, HrefParameterMode.override);

		if (param_items === null || param_page === null)
			history.replaceState(String(RefreshPage), '', this.#node_refresh.href);
	}
}
window.customElements.define('limiter-page_items', LimiterPageItems);

class VideoYoutube extends HTMLElement
{
	static #VideoYoutubeString(identifier)
	{
return `\
<iframe class='video-youtube-iframe' src='https://youtube.com/embed/${identifier}' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`;
	}

	get #identifier() { return this.getAttribute('identifier'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', VideoYoutube.#VideoYoutubeString(this.#identifier));
	}
}
window.customElements.define('video-youtube', VideoYoutube);

class ButtonMenu extends HTMLElement
{
	static #ButtonMenu0String(text, path, width, height)
	{
return `\
<span class='button-menu' tabindex='0' style='width: ${width}; height: ${height};'>
	<button class='button-menu-0'>
		<svg class='button-menu-image-left' width='12' height='12'>
			<use href='resource/htm/${path}.svg#$${text}'></use>
		</svg>
		${text}
		<svg class='button-menu-image-right' width='10' height='10'>
			<use href='resource/button/Caret - Bottom.svg#$Caret - Bottom'></use>
		</svg>
	</button>
	<span id='${path}_ButtonMenu0_Context' class='button-menu-0-context'>
	</span>
</span>`;
	}

	static #ButtonMenu1String(text, path, width, height)
	{
return `\
<span class='button-menu' tabindex='0' style='width: ${width}; height: ${height};'>
	<button class='button-menu-1'>
		<svg class='button-menu-image-left' width='12' height='12'>
			<use href='resource/htm/${path}.svg#$${text}'></use>
		</svg>
		${text}
		<svg class='button-menu-image-right' width='10' height='10'>
			<use href='resource/button/Caret - Right.svg#$Caret - Right'></use>
		</svg>
	</button>
	<span id='${path}_ButtonMenu1_Context' class='button-menu-1-context'>
	</span>
</span>`;
	}

	static #ButtonMenu1AString(text, path, width, height)
	{
return `\
<span class='button-menu' tabindex='0' style='width: ${width}; height: ${height};'>
	<a class='button-menu-1' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); document.activeElement.blur(); return false;'>
		<svg class='button-menu-image-left' width='12' height='12'>
			<use href='resource/htm/${path}.svg#$${text}'></use>
		</svg>
		${text}
		<svg class='button-menu-image-right' width='12' height='12'>
			<use href='resource/button/Caret - All.svg#$Caret - All'></use>
		</svg>
	</a>
</span>`;
	}

	static #ButtonMenu1BString(text, path, width, height)
	{
return `\
<span class='button-menu' tabindex='0' style='width: ${width}; height: ${height};'>
	<a class='button-menu-1' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); document.activeElement.blur(); return false;'>
		<svg class='button-menu-image-left' width='12' height='12'>
			<use href='resource/htm/${path}.svg#$${text}'></use>
		</svg>
		${text}
	</a>
</span>`;
	}

	get #element_width() { return this.getAttribute('element_width'); }
	get #element_height() { return this.getAttribute('element_height'); }

	constructor() { super(); }

	CreateElement()
	{
		for (const current of window.menu_tree.children[0].children)
		{
			this.parentElement.insertAdjacentHTML('beforeend', ButtonMenu.#ButtonMenu0String(current.text, current.path, this.#element_width, this.#element_height));
			const child = document.getElementById(`${current.path}_ButtonMenu0_Context`);
			child.insertAdjacentHTML('beforeend', ButtonMenu.#ButtonMenu1AString(current.text, current.path, this.#element_width, this.#element_height));
			this.#ButtonMenu1Recursive(child, current.children);
		}
	}

	#ButtonMenu1Recursive(parentElement, menu_tree_children)
	{
		for (const current of menu_tree_children)
		{
			if (current.children.length === 0)
				parentElement.insertAdjacentHTML('beforeend', ButtonMenu.#ButtonMenu1BString(current.text, current.path, this.#element_width, this.#element_height));
			else if (current.children.length > 0)
			{
				parentElement.insertAdjacentHTML('beforeend', ButtonMenu.#ButtonMenu1String(current.text, current.path, this.#element_width, this.#element_height));
				const child = document.getElementById(`${current.path}_ButtonMenu1_Context`);
				child.insertAdjacentHTML('beforeend', ButtonMenu.#ButtonMenu1AString(current.text, current.path, this.#element_width, this.#element_height));
				this.#ButtonMenu1Recursive(child, current.children);
			}
		}
	}
}
window.customElements.define('button-menu', ButtonMenu);

class ButtonPath extends HTMLElement
{
	static #LabelPathString()
	{
return `\
<label-half neon='var(--neon-matrix-color)'>Current Page Path</label-half>`;
	}

	static #ButtonPathString(text, path)
	{
return `\
<a class='button-path' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false;'>
	<svg class='button-path-image-left' width='12' height='12'>
		<use href='resource/htm/${path}.svg#$${text}'></use>
	</svg>
	${text}
	<span class='button-path-image-right'>
		<svg width='10' height='10'>
			<use href='resource/button/Caret - Left.svg#$Caret - Left'></use>
		</svg>
		<svg width='1' height='1'></svg>
		<svg width='10' height='10'>
			<use href='resource/button/Caret - Right.svg#$Caret - Right'></use>
		</svg>
	</span>
</a>`;
	}

	constructor()
	{
		super();

		this.parentElement.insertAdjacentHTML('beforeend', ButtonPath.#LabelPathString());
	}

	CreateElement()
	{
		let element = window.menu_tree;
		for (let i = 0; i < window.menu_tree_indexes.length; ++i)
		{
			element = element.children[window.menu_tree_indexes[i]];
			this.parentElement.insertAdjacentHTML('beforeend', ButtonPath.#ButtonPathString(element.text, element.path));
		}

		if (element.parameters !== undefined)
		{
			const href_with_parameters = GetHrefWithParameters(window.location.href, element.parameters, HrefParameterMode.append);
			if (window.location.href !== href_with_parameters)
				history.replaceState(String(RefreshPage), '', href_with_parameters);
		}
	}

	RefreshElement()
	{
		while (this.parentElement.childElementCount > 2)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}
}
window.customElements.define('button-path', ButtonPath);

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

class ButtonBranch extends HTMLElement
{
	static #ButtonBranchImageString()
	{
return `\
	<svg class='button-branch-image-top' width='14' height='14'>
		<use href='resource/button/Caret - Top.svg#$Caret - Top'></use>
	</svg>
	<svg class='button-branch-image-bottom' width='14' height='14'>
		<use href='resource/button/Caret - Bottom.svg#$Caret - Bottom'></use>
	</svg>
	<svg class='button-branch-image-left' width='14' height='14'>
		<use href='resource/button/Caret - Left.svg#$Caret - Left'></use>
	</svg>
	<svg class='button-branch-image-right' width='14' height='14'>
		<use href='resource/button/Caret - Right.svg#$Caret - Right'></use>
	</svg>
`;
	}
	static #ButtonBranchString(text, path)
	{
return `\
<a class='button-branch' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false;'>
	${text}
	<span id='${text}_ButtonBranchImage' class='button-branch-image'>
		${this.#ButtonBranchImageString()}
		<div class='button-branch-image-wrapper2'>${this.#ButtonBranchImageString()}</div>
	</span>
</a>`;
	}

	constructor() { super(); }

	CreateElement()
	{
		if (window.menu_last.children.length === 0)
			this.parentElement.style.display = 'none';
		else
		{
			this.parentElement.style.display = 'grid';

			const result = [];
			for (let i = 0; i < window.menu_last.children.length; ++i)
			{
				const current = window.menu_last.children[i];
				result.push(ButtonBranch.#ButtonBranchString(current.text, current.path));
			}
			this.parentElement.insertAdjacentHTML('beforeend', result.join(''));

			for (let i = 0; i < window.menu_last.children.length; ++i)
			{
				const current = window.menu_last.children[i];
				const button_branch_image_style = document.getElementById(`${current.text}_ButtonBranchImage`).style;

				button_branch_image_style.rotate = `${GetRandomFloat(0, 360)}deg`;
				button_branch_image_style.animationDuration = `${GetRandomFloat(4, 16)}s`;
				const animationDirection = Math.random();
				if (animationDirection > 0.75)
					button_branch_image_style.animationDirection = 'normal';
				else if (animationDirection > 0.5)
					button_branch_image_style.animationDirection = 'reverse';
				else if (animationDirection > 0.25)
					button_branch_image_style.animationDirection = 'alternate';
				else
					button_branch_image_style.animationDirection = 'alternate-reverse';
			}
		}
	}

	RefreshElement()
	{
		while (this.parentElement.childElementCount > 1)
			this.parentElement.lastChild.remove();
		this.CreateElement();
	}
}
window.customElements.define('button-branch', ButtonBranch);

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

		if (window.menu_last.loader === 'external')
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
		this.insertAdjacentHTML('beforeend', `<iframe src='${path_frame}.html' onload='iFrameResize({heightCalculationMethod: "max", scrolling: true, bodyMargin: 0, bodyBackground: "transparent"}, this);'></iframe>`);
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

class FooterSingle extends HTMLElement
{
	static #alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

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
			this.#random_color_prev = GetRandomColor(128, 255, 32, 128, 128, 255);
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

const WriteJournal = async (href = window.location.href.replace(window.location.origin, ''), force = false) =>
{
	if (window?.menu_last?.loader === 'external' && !force)
		return;

	const response_ipify = await fetch('https://api.ipify.org').catch(_ => new Response(null));
	const ip = response_ipify.ok ? await response_ipify.text() : null;

	await fetch(`${window.location.origin}/Java/Journal`,
		{
			method: 'post',
			body: JSON.stringify({href, ip})
		}).catch(_ => new Response(JSON.stringify({code: 400})));
};
window.WriteJournal = WriteJournal;

const button_path_main = document.getElementById('button_path_main');
const title_top_main = document.getElementById('title_top_main');
const button_branch_main = document.getElementById('button_branch_main');
const frame_main_main = document.getElementById('frame_main_main');

promise_menu_tree.then(response =>
{
	window.menu_tree = response;

	document.getElementById('header_double_main').CreateElement();
	document.getElementById('button_menu_main').CreateElement();

	window.menu_tree_indexes = ReturnMenuTreeIndexes();
	window.menu_last = ReturnMenuLast();

	button_path_main.CreateElement();
	title_top_main.CreateElement();
	button_branch_main.CreateElement();
	frame_main_main.CreateElement();

	WriteJournal();
});