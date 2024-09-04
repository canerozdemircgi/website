'use strict';

fetch('https://raw.githubusercontent.com/canerozdemircgi/Color-Picker/main/version.txt').then(response => response.text()).then(response =>
{
	document.getElementById('version_content').textContent = response;
});