#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER transaction_service;
	CREATE DATABASE transaction_service;
	GRANT ALL PRIVILEGES ON DATABASE transaction_service TO transaction_service;
EOSQL
