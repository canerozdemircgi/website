'use strict';

const promise_menu_tree = fetch('data/menu-tree.json').then(response => response.json());

const HrefParameterMode =
{
	stratch: 0,
	append: 1,
	override: 2
};
const GetHrefWithParameters = (href, parameters, href_parameter_mode) =>
{
	let href_parameters = '';
	const index_href_parameters = href.indexOf('?');
	if (index_href_parameters >= 0)
	{
		href_parameters = href.substring(index_href_parameters);
		href = href.substring(0, index_href_parameters);
	}

	let url_search = '';
	switch (href_parameter_mode)
	{
		case HrefParameterMode.stratch:
			url_search = new URLSearchParams();
			for (const item of Object.keys(parameters))
				url_search.set(item, parameters[item]);
			break;

		case HrefParameterMode.append:
			url_search = new URLSearchParams(href_parameters);
			for (const item of Object.keys(parameters))
			{
				if (url_search.get(item) === null)
					url_search.set(item, parameters[item]);
			}
			break;

		case HrefParameterMode.override:
			url_search = new URLSearchParams(href_parameters);
			for (const item of Object.keys(parameters))
				url_search.set(item, parameters[item]);
			break;
	}

	return `${href}?${decodeURIComponent(url_search.toString().replace(/\+/g, ' '))}`;
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
	const searchParams = new URL(window.location.href.replace(/\+/g, '%2B')).searchParams;
	if (searchParams.has('path'))
	{
		let path = searchParams.get('path').replaceAll('_', ' ');

		if (path.charAt(0) === '/')
			path = path.substring(1);
		const path_length0 = path.length - 1;
		if (path.charAt(path_length0) === '/')
			path = path.substring(0, path_length0);

		return CheckMenuTreeIndexesRecursive(path, window.menu_tree.children) || [1, 0];
	}
	else
		return [0];
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