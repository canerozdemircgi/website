'use strict';

fetch('https://raw.githubusercontent.com/canerozdemircgi/Resume/main/version.txt').then(response => response.text()).then(response =>
{
	document.getElementById('version_content').textContent = response;
});