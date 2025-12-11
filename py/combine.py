from os import chdir, getcwd
from re import compile as re_compile

def ParseHtml(html_lines, i, element_code_regex, element_code_main_old, element_code_main_new, element_paths_old):
	element_code_compiled_search = element_code_regex.search(html_lines[i])
	if element_code_compiled_search:
		element_paths_old.append(element_code_compiled_search.group(1))
		if element_code_main_old in html_lines[i]:
			html_lines[i] = html_lines[i].replace(element_code_main_old, element_code_main_new)
		else:
			del html_lines[i]
			i -= 1
			while html_lines[i] == '' and html_lines[i + 1] == '':
				del html_lines[i]
				i -= 1

		i += 1
		return True, i
	return False, i

def Combine(
	html_dir,
	html_path_main_old,
	css_path_main_old,
	js_path_main_old
):
	chdir(html_dir)

	html_path_main_new = html_path_main_old.replace(postfix, '')
	css_path_main_new = css_path_main_old.replace(postfix, '')
	js_path_main_new = js_path_main_old.replace(postfix, '')

	css_code_main_old = css_code_gen.format(css_path_main_old)
	js_code_main_old = js_code_gen.format(js_path_main_old)

	css_code_main_new = css_code_gen.format(css_path_main_new)
	js_code_main_new = js_code_gen.format(js_path_main_new)

	css_paths_old = []
	js_paths_old = []

	with open(html_path_main_old, encoding='utf-8') as html_file_old:
		html_lines = html_file_old.read().splitlines()
		i = 0
		while i < len(html_lines):
			is_match, i = ParseHtml(html_lines, i, css_code_regex, css_code_main_old, css_code_main_new, css_paths_old)
			if is_match:
				continue
			is_match, i = ParseHtml(html_lines, i, js_code_regex, js_code_main_old, js_code_main_new, js_paths_old)
			if is_match:
				continue
			i += 1

	with open(html_path_main_new, 'w', encoding='utf-8', newline='\n') as html_file_new:
		html_file_new.write('\n'.join(html_lines))

	with open(css_path_main_new, 'w', encoding='utf-8', newline='\n') as css_file_new:
		for i, css_path_old in enumerate(css_paths_old):
			separator = '' if i == len(css_paths_old) - 1 else '\n\n'
			with open(css_path_old, encoding='utf-8') as css_file_old:
				css_file_new.write(css_file_old.read() + separator)

	with open(js_path_main_new, 'w', encoding='utf-8', newline='\n') as js_file_new:
		js_file_new.write(js_code_residual)
		for i, js_path_old in enumerate(js_paths_old):
			separator = '' if i == len(js_paths_old) - 1 else '\n\n'
			with open(js_path_old, encoding='utf-8') as js_file_old:
				js_file_old.readline()
				js_file_old.readline()
				js_file_new.write(js_file_old.read() + separator)

	chdir(cur_dir)

params =\
[
	[
		'../',
		'index-origin.html',
		'css/index-origin.css',
		'js/index-origin.js'
	],
	[
		'../htm/Main/Software/Training',
		'Training-origin.html',
		'css/training-origin.css',
		'js/training-origin.js'
	],
	[
		'../htm/Main/Software/Training',
		'training_challenge-origin.html',
		'css/training_challenge-origin.css',
		'js/training_challenge-origin.js'
	]
]
postfix = '-origin'

css_code_gen = "<link rel='stylesheet' href='{}'>"
js_code_gen = "<script defer src='{}'></script>"

js_code_residual = "'use strict';\n\n"

css_code_regex = re_compile(css_code_gen.replace('{}', '((?:(?!library).)*)'))
js_code_regex = re_compile(js_code_gen.replace('{}', '((?:(?!library).)*)'))

cur_dir = getcwd()

for param in params:
	Combine(*param)