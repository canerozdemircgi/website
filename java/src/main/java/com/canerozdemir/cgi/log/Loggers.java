package com.canerozdemir.cgi.log;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public final class Loggers
{
	public static final Logger logger = LogManager.getLogger("CanerOzdemirCgi");
	public static final Logger loggerJournal = LogManager.getLogger("CanerOzdemirCgi_Journal");
}