package com.canerozdemir.cgi.data;

import com.canerozdemir.cgi.log.Loggers;
import com.zaxxer.hikari.HikariDataSource;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.MessageFormat;

public final class Database
{
	public static final HikariDataSource dataSource = new HikariDataSource();

	public static void Init()
	{
		final String[] credentials;
		try
		{
			credentials = Files.readString(Paths.get("/root/.pgpass")).split(":");
		}
		catch (final Exception ex)
		{
			Loggers.logger.fatal(ex);
			return;
		}

		Database.dataSource.setJdbcUrl(MessageFormat.format("jdbc:postgresql://{0}:{1}/{2}?user={3}&sslmode=prefer", credentials[0], credentials[1], credentials[3], credentials[2]));
		Database.dataSource.setPassword(credentials[4]);
		Database.dataSource.setAutoCommit(false);
		Database.dataSource.setMaxLifetime(540000);
		// Database.dataSource.setLeakDetectionThreshold(60000);
	}
}