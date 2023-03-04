#!/bin/bash
set -e

# Create transaction_service user with required permissions and transaction_service DB
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER transaction_service WITH PASSWORD 'password';
	ALTER USER transaction_service CREATEDB;
	CREATE DATABASE transaction_service;
	GRANT ALL PRIVILEGES ON DATABASE transaction_service TO transaction_service;
EOSQL

# Create transaction_service schema plus account, category and transaction tables
psql -v ON_ERROR_STOP=1 --username "transaction_service" --dbname "transaction_service" <<-EOSQL
	CREATE SCHEMA transaction_service;

	CREATE TABLE transaction_service.account (
		"id" TEXT PRIMARY KEY,
		"name" TEXT,
		"bank" TEXT
	);

	CREATE TABLE transaction_service.category (
		"id" TEXT PRIMARY KEY,
		"name" TEXT,
		"color" TEXT
	);

	CREATE TABLE transaction_service.transaction (
		"id" TEXT PRIMARY KEY,
		"accountId" TEXT REFERENCES transaction_service.account(id),
		"categoryId" TEXT REFERENCES transaction_service.category(id),
		"reference" TEXT,
		"amount" FLOAT8,
		"currency" TEXT,
		"date"  TIMESTAMP
	);
EOSQL

# Seed tables with csv data
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "transaction_service" <<-EOSQL
	COPY transaction_service.account(id, name, bank)
	FROM '/docker-entrypoint-initdb.d/data/accounts.csv'
	DELIMITER ','
	CSV HEADER;

	COPY transaction_service.category(id, name, color)
	FROM '/docker-entrypoint-initdb.d/data/categories.csv'
	DELIMITER ','
	CSV HEADER;

	COPY transaction_service.transaction(id, "accountId", "categoryId", reference, amount, currency, date)
	FROM '/docker-entrypoint-initdb.d/data/transactions.csv'
	DELIMITER ','
	CSV HEADER;
EOSQL

# Create indexes
psql -v ON_ERROR_STOP=1 --username "transaction_service" --dbname "transaction_service" <<-EOSQL
	CREATE INDEX transaction_amount_idx
	ON transaction_service.transaction(amount, currency);

	CREATE INDEX transaction_date_idx
	ON transaction_service.transaction(date, currency);
EOSQL
