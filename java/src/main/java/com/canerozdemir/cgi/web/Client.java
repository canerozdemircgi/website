package com.canerozdemir.cgi.web;

import com.mashape.unirest.http.Unirest;

public final class Client
{
	public static String askGeoLocation(final String ip)
	{
		try
		{
			return Unirest.get("https://json.geoiplookup.io/" + ip).asString().getBody();
		}
		catch (final Exception ex)
		{
			return "";
		}
	}
}