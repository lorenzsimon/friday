CREATE SCHEMA IF NOT EXISTS transaction_service;

-- seed accounts
CREATE TABLE IF NOT EXISTS transaction_service.accounts (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "bank" TEXT
);
COPY transaction_service.accounts(id, name, bank)
FROM '/docker-entrypoint-initdb.d/data/accounts.csv'
DELIMITER ','
CSV HEADER;

-- seed categories
CREATE TABLE IF NOT EXISTS transaction_service.categories (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "color" TEXT
);
COPY transaction_service.categories(id, name, color)
FROM '/docker-entrypoint-initdb.d/data/categories.csv'
DELIMITER ','
CSV HEADER;

-- seed transactions
CREATE TABLE IF NOT EXISTS transaction_service.transactions (
  "id" TEXT PRIMARY KEY,
  "accountId" TEXT REFERENCES transaction_service.accounts(id),
  "categoryId" TEXT REFERENCES transaction_service.categories(id),
  "reference" TEXT,
  "amount" FLOAT8,
  "currency" TEXT,
  "date"  TIMESTAMP
);
COPY transaction_service.transactions(id, "accountId", "categoryId", reference, amount, currency, date)
FROM '/docker-entrypoint-initdb.d/data/transactions.csv'
DELIMITER ','
CSV HEADER;
