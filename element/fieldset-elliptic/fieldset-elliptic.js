'use strict';

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