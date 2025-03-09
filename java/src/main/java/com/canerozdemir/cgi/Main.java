package com.canerozdemir.cgi;

import com.canerozdemir.cgi.data.Database;
import com.canerozdemir.cgi.web.Server;

final class Main
{
	public static void main(final String[] args)
	{
		Database.Init();
		Server.Init();
	}
}