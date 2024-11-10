'use strict';

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