import { RESTDataSource } from '@apollo/datasource-rest';
import { TransactionDetail } from './dto/transaction-detail.dto';
import { TransactionSummary } from './dto/transaction-summary.dto';

export class TransactionAPI extends RESTDataSource {
    override baseURL = process.env.TRANSACTION_SERVICE_URL

    async getTransactionDetail(id: string): Promise<TransactionDetail> {
        return this.get<TransactionDetail>(`transactions/${encodeURIComponent(id)}`)
    }

    async getTransactionSummaries(
        take: number,
        skip: number,
        reference?: string,
        sort?: 'amount' | 'date',
        order?: 'asc' | 'desc',
        dateStart?: string,
        dateEnd?: string,
        category?: string,
        currency?: string,
        bank?: string,
        account?: string,
        amountMin?: number,
        amountMax?: number
    ): Promise<TransactionSummary[]> {
        return this.get<TransactionSummary[]>('transactions', {
            params: {
                take: `${take}`,
                skip: `${skip}`,
                reference,
                sort,
                order,
                dateStart,
                dateEnd,
                category,
                currency,
                bank,
                account,
                amountMin: amountMin?.toString(),
                amountMax: amountMax?.toString()
            }
        })
    }
}
