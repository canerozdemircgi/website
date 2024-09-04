'use strict';

const WriteJournal = async (href = window.location.href.replace(window.location.origin, ''), force = false) =>
{
	if (window?.menu_last?.loader === 'external' && !force)
		return;

	const response_ipify = await fetch('https://api.ipify.org').catch(_ => new Response(null));
	const ip = response_ipify.ok ? await response_ipify.text() : null;

	await fetch(`${window.location.origin}/Java/Journal`,
		{
			method: 'post',
			body: JSON.stringify({href, ip})
		}).catch(_ => new Response(JSON.stringify({code: 400})));
};
window.WriteJournal = WriteJournal;