package com.canerozdemir.cgi.web;

import com.canerozdemir.cgi.web.answer.journal.Journal;
import com.jsoniter.output.JsonStream;
import io.javalin.Javalin;
import io.javalin.core.JavalinConfig;
import io.javalin.http.Context;

public final class Server
{
	public static void Init()
	{
		final Javalin server = Javalin.create(JavalinConfig::enableCorsForAllOrigins).start(4567);
		server.post("/Java/Journal", (final Context context) ->
		{
			context.result(JsonStream.serialize(0));
			Journal.Operate(context, Server.GetIp(context));
		});
	}

	private static String GetIp(final Context context)
	{
		final String forwarded = context.header("X-Forwarded-For");
		return forwarded == null || forwarded.isEmpty() ? context.ip() : forwarded.split(",")[0];
	}
}