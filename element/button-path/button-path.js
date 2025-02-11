'use strict';

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