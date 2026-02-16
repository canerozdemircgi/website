'use strict';

class FieldsetDescription extends HTMLElement
{
	static #FieldsetDescriptionString(title, text)
	{
return `
<fieldset class='fieldset-description'>
	<legend class='f_serif fieldset-description-legend'>${title}</legend>
	<span class='span-description-bottom'>${text}</span>
</fieldset>`;
	}

	constructor()
	{
		super();

		const innerHTML = this.innerHTML.trim().split('\n');
		this.innerHTML = null;

		const title = innerHTML.shift();
		const text = innerHTML.join('\n');
		this.insertAdjacentHTML('beforeend', FieldsetDescription.#FieldsetDescriptionString(title, text));

		const u_elements = this.getElementsByTagName('u');
		for (const u_element of u_elements)
			u_element.classList.add('f_mono');
	}
}
window.customElements.define('fieldset-description', FieldsetDescription);