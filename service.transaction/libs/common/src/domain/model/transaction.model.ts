import { Transaction as TransactionEntity, Account as AccountEntity, Category as CategoryEntity } from "@prisma/client";
import { Account } from "./account.model";
import { Category } from "./category.model";

export class Transaction {
    constructor(
        public readonly id: string,
        public readonly account?: Account,
        public readonly category?: Category,
        public readonly reference?: string,
        public readonly amount?: number,
        public readonly currency?: string,
        public readonly date?: Date
    ) {}

    static from(entity: TransactionEntity & { account?: AccountEntity | null, category?: CategoryEntity | null }): Transaction {
        return new Transaction(
            entity.id,
            entity.account ? new Account(
                entity.account.name ?? undefined,
                entity.account.bank ?? undefined
            ) : undefined,
            entity.category ? new Category(
                entity.category.name ?? undefined,
                entity.category.color ?? undefined
            ) : undefined,
            entity.reference ?? undefined,
            entity.amount ?? undefined,
            entity.currency ?? undefined,
            entity.date ?? undefined
        )
    }
}
