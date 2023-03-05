import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './server';
import { TransactionAPI } from "./transaction/source";

async function bootstrap() {
    require('dotenv').config()

    const { url } = await startStandaloneServer(server, {
        context: async () => ({ dataSources: { transactionAPI: new TransactionAPI({ cache: server.cache }) } }),
        listen: { port: 8080 }
    })

    console.log(`🚀  Server ready at: ${url}`)
}

bootstrap()
