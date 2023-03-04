import { Transaction } from '@app/common/domain/model/transaction.model';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll(
        take: number,
        skip: number,
        reference?: string,
        sort?: 'amount' | 'date',
        order?: 'asc' | 'desc',
        dateStart?: Date,
        dateEnd?: Date,
        category?: string,
        currency?: string,
        bank?: string,
        accout?: string,
        amountMin?: number,
        amountMax?: number
    ): Promise<Transaction[]> {
        const transactionEntities = await this.prismaService.transaction.findMany({
            take: take,
            skip: skip, // TODO: Use cursor for better efficiency
            where: {
                reference: {
                    search: reference // TODO: Use FTS search index for better efficiency
                },
                date: {
                    lt: dateEnd,
                    gt: dateStart
                },
                amount: {
                    lt: amountMax,
                    gt: amountMin
                },
                currency,
                category: {
                    name: category
                },
                account: {
                    bank: bank,
                    name: accout
                }
            },
            orderBy: sort == 'amount'
                ? { amount: order }
                : { date: order },
            include: {
                category: true
            }
        })

        return transactionEntities.map(trx => Transaction.from(trx))
    }

    async findOne(id: string): Promise<Transaction | null> {
        const transactionEntity = await this.prismaService.transaction.findFirst({
            where: { id },
            include: {
                account: true,
                category: true
            }
        })

        return transactionEntity ? Transaction.from(transactionEntity) : null
    }
}
