package com.canerozdemir.cgi.data;

import java.text.MessageFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public final class DateTime
{
	private static final ZoneId zoneId = ZoneId.of("Europe/Istanbul");
	private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	public static String DateTimeNow()
	{
		final ZonedDateTime now = ZonedDateTime.now(DateTime.zoneId);
		return MessageFormat.format("{0} {1}", now.format(DateTime.dateTimeFormatter), now.getOffset());
	}
}