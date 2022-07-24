'use strict';

const promise_menu_tree = fetch('data/menu-tree.json').then(response => response.json());

const HrefParameterMode =
{
	stratch: 0,
	override: 1,
	append: 2
};
const GetHrefWithParameters = (href, parameters, href_parameter_mode) =>
{
	const url = new URL(href.replace(/\+/g, '%2B'));
	if (HrefParameterMode.stratch === href_parameter_mode)
		url.search = '';
	const url_search = new URLSearchParams(url.search);

	switch (href_parameter_mode)
	{
		case HrefParameterMode.stratch:
		case HrefParameterMode.override:
			for (const item of Object.keys(parameters))
				url_search.set(item, parameters[item]);
			break;

		case HrefParameterMode.append:
			for (const item of Object.keys(parameters))
			{
				if (url_search.get(item) === null)
					url_search.set(item, parameters[item]);
			}
			break;
	}

	url.search = url_search.toString();
	return decodeURIComponent(url.toString().replace(/\+/g, '%20'));
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
	let path = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams.get('path');
	if (path === null || path === '')
		return [0];
	else
	{
		if (path.charAt(0) === '/')
			path = path.substring(1);
		const path_length0 = path.length - 1;
		if (path.charAt(path_length0) === '/')
			path = path.substring(0, path_length0);

		return CheckMenuTreeIndexesRecursive(path, window.menu_tree.children) || [1, 0];
	}
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

const setTimeoutImmediate = (func, interval) =>
{
	func();
	return setTimeout(func, interval);
};
const setIntervalImmediate = (func, interval) =>
{
	func();
	return setInterval(func, interval);
};

const GetRandomInt = (min, max) =>
{
	return Math.floor(Math.random() * (max - min + 1) + min);
};
const GetRandomColor = (rMin, rMax, gMin, gMax, bMin, bMax) =>
{
	const r = GetRandomInt(rMin, rMax);
	const g = GetRandomInt(gMin, gMax);
	const b = GetRandomInt(bMin, bMax);
	return `style='color: rgb(${r}, ${g}, ${b})'`;
};