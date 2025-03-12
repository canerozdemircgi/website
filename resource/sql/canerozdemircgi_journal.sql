DROP TABLE IF EXISTS canerozdemircgi_journal;
CREATE TABLE canerozdemircgi_journal
(
	id serial NOT NULL,
	datetime timestamp with time zone,
	ip text,
	iplocation text,
	url text,
	webbrowser text,
	CONSTRAINT canerozdemircgi_journal_pk PRIMARY KEY (id)
);
CREATE INDEX canerozdemircgi_journal_datetime_uindex ON canerozdemircgi_journal (datetime);
CREATE INDEX canerozdemircgi_journal_ip_uindex ON canerozdemircgi_journal (ip);

CREATE OR REPLACE FUNCTION canerozdemircgi_journal_select_brief
(
	p_offset int,
	p_limit int
)
RETURNS setof refcursor AS
$$
	DECLARE r_count1 refcursor := 'r_count1';
	DECLARE r_table1 refcursor := 'r_table1';

	BEGIN

		OPEN r_count1 FOR
			SELECT COUNT(DISTINCT ip) AS count
			FROM canerozdemircgi_journal;
		RETURN NEXT r_count1;

		OPEN r_table1 FOR
			SELECT
				datetime,
				ip,
				iplocation,
				url,
				webbrowser
			FROM
			(
				SELECT
					DISTINCT ON (ip) ip,
					datetime,
					iplocation,
					url,
					webbrowser
				FROM canerozdemircgi_journal
				ORDER BY ip, datetime DESC
			) AS t1
			ORDER BY datetime DESC
			LIMIT p_limit
			OFFSET p_offset;
		RETURN NEXT r_table1;

	END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION canerozdemircgi_journal_select_detail
(
	p_offset int,
	p_limit int,
	p_ip text
)
RETURNS setof refcursor AS
$$
	DECLARE r_count1 refcursor := 'r_count1';
	DECLARE r_table1 refcursor := 'r_table1';

	BEGIN

		OPEN r_count1 FOR
			SELECT COUNT(*) AS count
			FROM canerozdemircgi_journal
			WHERE ip = p_ip;
		RETURN NEXT r_count1;

		OPEN r_table1 FOR
			SELECT
				datetime,
				ip,
				iplocation,
				url,
				webbrowser
			FROM canerozdemircgi_journal
			WHERE ip = p_ip
			ORDER BY datetime DESC
			LIMIT p_limit
			OFFSET p_offset;
		RETURN NEXT r_table1;

	END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION canerozdemircgi_journal_insert
(
	p_datetime timestamp with time zone,
	p_ip text,
	p_url text,
	p_webbrowser text
)
RETURNS int AS
$$
	DECLARE r_id int;

	BEGIN

		INSERT INTO canerozdemircgi_journal
		(
			datetime,
			ip,
			url,
			webbrowser
		)
		VALUES
		(
			p_datetime,
			p_ip,
			p_url,
			p_webbrowser
		)
		RETURNING id
		INTO r_id;

		RETURN r_id;

	END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION canerozdemircgi_journal_update_location
(
	p_id int,
	p_iplocation text
)
RETURNS void AS
$$
	BEGIN

	UPDATE canerozdemircgi_journal
	SET iplocation = p_iplocation
	WHERE id = p_id;

	END;
$$
LANGUAGE plpgsql;