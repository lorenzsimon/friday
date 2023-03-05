import { readFileSync } from "fs";

export const transactionTypeDefs = readFileSync('./src/transaction/transaction.graphql', { encoding: 'utf-8' })
