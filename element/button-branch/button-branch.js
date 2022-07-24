'use strict';

class ButtonBranch extends HTMLElement
{
	static #ButtonBranchString(text, path)
	{
return `\
<a class='button-branch' href='${GetHrefWithParameters(window.location.href, {path}, HrefParameterMode.stratch)}' onclick='NavigatePage(this.href); return false;'>
	${text}
	<span class='button-branch-image'>
		<svg class='button-branch-image-top' width='14' height='14'>
			<use href='resource/button/Caret - Top.svg#Caret - Top'></use>
		</svg>
		<svg class='button-branch-image-bottom' width='14' height='14'>
			<use href='resource/button/Caret - Bottom.svg#Caret - Bottom'></use>
		</svg>
		<svg class='button-branch-image-left' width='14' height='14'>
			<use href='resource/button/Caret - Left.svg#Caret - Left'></use>
		</svg>
		<svg class='button-branch-image-right' width='14' height='14'>
			<use href='resource/button/Caret - Right.svg#Caret - Right'></use>
		</svg>
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