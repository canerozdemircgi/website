'use strict';

fetch('https://raw.githubusercontent.com/canerozdemircgi/bladder-diary/main/version.txt').then(response => response.text()).then(response =>
{
	document.getElementById('version_content').textContent = response;
});