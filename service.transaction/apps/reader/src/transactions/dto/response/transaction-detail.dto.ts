import { Transaction } from "@app/common/domain/model/transaction.model";
import { Account } from "@app/common/domain/model/account.model";
import { Category } from "@app/common/domain/model/category.model";

export class TransactionDetailDTO {
    constructor(
        public readonly id: string,
        public readonly account?: TransactionDetail.AccountDTO,
        public readonly category?: TransactionDetail.CategoryDTO,
        public readonly reference?: string,
        public readonly amount?: number,
        public readonly currency?: string,
        public readonly date?: Date
    ) {}

    static from(transaction: Transaction): TransactionDetailDTO {
        return new TransactionDetailDTO(
            transaction.id,
            transaction.account 
                ? TransactionDetail.AccountDTO.from(transaction.account) 
                : undefined,
            transaction.category 
                ? TransactionDetail.CategoryDTO.from(transaction.category) 
                : undefined,
            transaction.reference,
            transaction.amount,
            transaction.currency,
            transaction.date
        )
    }
}

namespace TransactionDetail {
    export class AccountDTO {
        constructor(
            public readonly name?: string,
            public readonly bank?: string
        ) {}

        static from(account: Account) {
            return new AccountDTO(
                account.name,
                account.bank
            )
        }
    }

    export class CategoryDTO {
        constructor(
            public readonly name?: string,
            public readonly color?: string
        ) {}

        static from(category: Category) {
            return new CategoryDTO(
                category.name,
                category.color
            )
        }
    }
}
