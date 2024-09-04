'use strict';

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