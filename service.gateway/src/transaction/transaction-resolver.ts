import { TransactionAPI } from "./source";

type ResolverContext = { dataSources: { transactionAPI: TransactionAPI } }

interface TransactionDetailArgs {
    readonly id: string
}

interface TransactionSummariesInput {
    readonly take: number
    readonly skip: number
    readonly reference?: string
    readonly sort?: 'amount' | 'date'
    readonly order?: 'asc' | 'desc'
    readonly dateStart?: string
    readonly dateEnd?: string
    readonly category?: string
    readonly currency?: string
    readonly bank?: string
    readonly account?: string
    readonly amountMin?: number
    readonly amountMax?: number
}

const transactionDetailResolver = 
    async (_: any, args: TransactionDetailArgs, { dataSources }: ResolverContext) => 
        dataSources.transactionAPI.getTransactionDetail(args.id)

const transactionSummariesResolver = 
    async (_: any, args: { input: TransactionSummariesInput }, { dataSources }: ResolverContext) => {
        return {
            skip: args.input.skip,
            transactions: dataSources.transactionAPI.getTransactionSummaries(
                args.input.take,
                args.input.skip,
                args.input.reference,
                args.input.sort,
                args.input.order,
                args.input.dateStart,
                args.input.dateEnd,
                args.input.category,
                args.input.currency,
                args.input.bank,
                args.input.account,
                args.input.amountMin,
                args.input.amountMax
            )
        }
}

export const resolver = {
    Query: {
        transactionDetail: transactionDetailResolver,
        transactionSummaries: transactionSummariesResolver
    }
}
