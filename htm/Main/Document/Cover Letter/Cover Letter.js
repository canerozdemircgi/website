'use strict';

fetch('https://raw.githubusercontent.com/canerozdemircgi/Resume/main/version.txt').then(response => response.text()).then(response =>
{
	document.getElementById('version_content').textContent = response;
});

const href_main = document.getElementsByTagName('href-main');

const input_company = document.getElementById('input_company');
input_company.SignalRefresh = () =>
{
	for (let i = 0; i < href_main.length; ++i)
	{
		if (href_main[i].href.includes('index-1-'))
			href_main[i].href = GetHrefWithParameters(href_main[i].href, {'company': input_company.value}, HrefParameterMode.override);
	}
};
input_company.SignalRefresh();

const input_position = document.getElementById('input_position');
input_position.SignalRefresh = () =>
{
	for (let i = 0; i < href_main.length; ++i)
	{
		if (href_main[i].href.includes('index-1-'))
			href_main[i].href = GetHrefWithParameters(href_main[i].href, {'position': input_position.value}, HrefParameterMode.override);
	}
};
input_position.SignalRefresh();