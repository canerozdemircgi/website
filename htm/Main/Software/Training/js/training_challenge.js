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

class SpanDescription extends HTMLElement
{
	static #SpanDescriptionString(href, title, text)
	{
return `
<a target='_blank' class='f_serif' href='${href}'>${title}</a>
<div class='br10'></div>
<span class='span-description-bottom'>${text}</span>`;
	}

	constructor()
	{
		super();

		const innerHTML = this.innerHTML.trim().split('\n');
		this.innerHTML = null;

		const href = innerHTML.shift();
		const title = innerHTML.shift();
		const text = innerHTML.join('\n');
		this.insertAdjacentHTML('beforeend', SpanDescription.#SpanDescriptionString(href, title, text));

		const u_elements = this.getElementsByTagName('u');
		for (const u_element of u_elements)
			u_element.classList.add('f_mono');
	}
}
window.customElements.define('span-description', SpanDescription);

class HrefImage extends HTMLElement
{
	static #HrefImageString(src, style)
	{
return `\
<a target='_parent' href='${src}'><img src='${src}' style='${style}'></a>`;
	}

	get #src() { return this.getAttribute('src'); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', HrefImage.#HrefImageString(this.#src, this.getAttribute('style')));
		this.removeAttribute('style')
	}
}
window.customElements.define('href-image', HrefImage);

const path = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams.get('path');
const promise_question = fetch(`page/question/${path}.htm`).then(response => response.ok ? response.text() : null);
const promise_answer = fetch(`page/answer/python/${path}.py`).then(response => response.ok ? response.text() : null);

document.title = path;

const training_question = document.getElementById('training_question');
const training_answer = document.getElementById('training_answer');

Promise.all([promise_question, promise_answer]).then(([response_question, response_answer]) =>
{
	if (response_question !== null)
		training_question.insertAdjacentHTML('beforeend', response_question);

	if (response_answer !== null)
	{
		training_answer.insertAdjacentHTML('beforeend', response_answer);

		hljs.getLanguage('python').keywords.literal.push('self');
		hljs.highlightElement(training_answer);
		hljs.lineNumbersBlock(training_answer, {singleLine: true});
	}
});

if (window.frameElement !== null)
{
	fetch(`css/training_challenge-frame.css`).then(response => response.ok ? response.text() : null).then(response =>
	{
		document.body.insertAdjacentHTML('beforeend', `<style>${response}</style>`);
		requestAnimationFrame(() => document.body.style.paddingBottom = `${document.body.offsetHeight - document.getElementById('training_separator').offsetHeight}px`);
	});

	window.parent.WriteJournal(window.location.href.replace(window.location.origin, ''), true);
}