package com.canerozdemir.cgi.web.answer.journal.dto;

public final class DtoOutput
{
	public final String datetime;
	public final String ip;
	public final String url;
	public final String webbrowser;
	public final String iplocation;

	public DtoOutput(final String datetime, final String ip, final String url, final String webbrowser, final String iplocation)
	{
		this.datetime = datetime;
		this.ip = ip;
		this.url = url;
		this.webbrowser = webbrowser;
		this.iplocation = iplocation;
	}
}