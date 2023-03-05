import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolver } from "./transaction";
import { TransactionAPI } from "./transaction/source";
import { transactionTypeDefs } from "./types";

const schema = makeExecutableSchema({
    typeDefs: [transactionTypeDefs],
    resolvers: resolver
})

interface ContextValue {
    dataSources: {
      transactionAPI: TransactionAPI
    }
}

export const server = new ApolloServer<ContextValue>({ schema })
