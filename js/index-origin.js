'use strict';

const button_path_main = document.getElementById('button_path_main');
const title_top_main = document.getElementById('title_top_main');
const button_branch_main = document.getElementById('button_branch_main');
const frame_main_main = document.getElementById('frame_main_main');

promise_menu_tree.then(response =>
{
	window.menu_tree = response;

	document.getElementById('header_double_main').CreateElement();
	document.getElementById('button_menu_main').CreateElement();

	window.menu_tree_indexes = ReturnMenuTreeIndexes();
	window.menu_last = ReturnMenuLast();

	button_path_main.CreateElement();
	title_top_main.CreateElement();
	button_branch_main.CreateElement();
	frame_main_main.CreateElement();

	WriteJournal();
});