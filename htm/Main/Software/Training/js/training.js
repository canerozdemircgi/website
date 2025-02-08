'use strict';

const promise = fetch('data/data.json').then(response => response.json());

const CreateHyperlink = (parent, href, text) => parent.insertAdjacentHTML('beforeend', `<a href='${href}'>${text}</a>`);

const CreateFieldset = (parent, title) =>
{
	const fieldset = document.createElement('fieldset');

	fieldset.insertAdjacentHTML('beforeend', `<legend>${title}</legend>`);

	parent.appendChild(fieldset);
	return fieldset;
};

const CreateElements = (parent, level, key, value) =>
{
	if (!(value instanceof Object))
	{
		const href = `training_challenge.html?path=${value}`;
		CreateHyperlink(parent, href, key);
		return;
	}

	if (level > 1)
		parent = CreateFieldset(parent, key);
	else if (level > 0)
	{
		parent = CreateFieldset(parent, key);
		parent.className = 'fieldset-packery';
	}

	level += 1;
	for (const key in value)
		CreateElements(parent, level, key, value[key]);
};

promise.then(data =>
{
	CreateElements(document.body, 0, 'Question', data);

	new Packery(document.body, {itemSelector: '.fieldset-packery', gutter: 10, transitionDuration: 0});
});

if (window.frameElement !== null)
	window.parent.WriteJournal(window.location.href.replace(window.location.origin, ''), true);