'use strict';

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
		requestIdleCallback(() => document.body.style.paddingBottom = `${document.body.offsetHeight - document.getElementById('training_separator').offsetHeight}px`);
	});

	window.parent.WriteJournal(window.location.href.replace(window.location.origin, ''), true);
}