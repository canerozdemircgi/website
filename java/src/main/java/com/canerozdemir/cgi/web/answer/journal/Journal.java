package com.canerozdemir.cgi.web.answer.journal;

import com.canerozdemir.cgi.data.Database;
import com.canerozdemir.cgi.data.DateTime;
import com.canerozdemir.cgi.log.Loggers;
import com.canerozdemir.cgi.web.Client;
import com.canerozdemir.cgi.web.answer.journal.dto.DtoInput;
import com.canerozdemir.cgi.web.answer.journal.dto.DtoOutput;
import com.jsoniter.JsonIterator;
import com.jsoniter.output.JsonStream;
import io.javalin.http.Context;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Journal
{
	public static void Operate(final Context context, final String ipProxy)
	{
		final DtoInput dtoInput = JsonIterator.deserialize(context.body(), DtoInput.class);
		final String ip = dtoInput.ip == null || dtoInput.ip.isEmpty() ? ipProxy : dtoInput.ip;

		final DtoOutput dtoOutput = new DtoOutput
		(
			DateTime.DateTimeNow(),
			ip,
			dtoInput.href,
			context.userAgent(),
			Client.askGeoLocation(ip)
		);

		try
		(
			final Connection connection = Database.dataSource.getConnection();
			final PreparedStatement preparedStatementInsert = connection.prepareStatement("SELECT canerozdemircgi_journal_insert(?::timestamp with time zone, ?::text, ?::text, ?::text)")
		)
		{
			preparedStatementInsert.setString(1, dtoOutput.datetime);
			preparedStatementInsert.setString(2, dtoOutput.ip);
			preparedStatementInsert.setString(3, dtoOutput.url);
			preparedStatementInsert.setString(4, dtoOutput.webbrowser);

			try (final ResultSet resultSet = preparedStatementInsert.executeQuery())
			{
				connection.commit();

				resultSet.next();
				final int id = resultSet.getInt(1);

				try (final PreparedStatement preparedStatementUpdate = connection.prepareStatement("SELECT canerozdemircgi_journal_update_location(?::int, ?::text)"))
				{
					preparedStatementUpdate.setInt(1, id);
					preparedStatementUpdate.setString(2, dtoOutput.iplocation);

					preparedStatementUpdate.execute();

					connection.commit();
				}
			}
		}
		catch (final Exception ex)
		{
			Loggers.logger.error(ex);
		}

		final Map<String, Object> journalBackup = new LinkedHashMap<>(5);
		try
		{
			for (final Field field : dtoOutput.getClass().getDeclaredFields())
				journalBackup.put(field.getName(), field.get(dtoOutput));
		}
		catch (final Exception ex)
		{
			Loggers.logger.error(ex);
		}
		Loggers.loggerJournal.info(JsonStream.serialize(journalBackup));
	}
}