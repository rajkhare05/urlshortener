CREATE DATABASE short_urls;

\c short_urls;

CREATE TABLE links (
    short VARCHAR(20) NOT NULL,
    original TEXT NOT NULL,
    clicks INT8 NOT NULL DEFAULT 0,
    time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
