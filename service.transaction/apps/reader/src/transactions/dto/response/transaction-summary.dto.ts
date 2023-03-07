import { Transaction } from "@app/common/domain/model/transaction.model";
import { Category } from "@app/common/domain/model/category.model";

export class TransactionSummaryDTO {
    constructor(
        public readonly id: string,
        public readonly category?: TransactionSummary.CategoryDTO,
        public readonly reference?: string,
        public readonly amount?: number,
        public readonly currency?: string,
        public readonly date?: Date
    ) {}

    static from(transaction: Transaction) {
        return new TransactionSummaryDTO(
            transaction.id,
            transaction.category 
                ? TransactionSummary.CategoryDTO.from(transaction.category) 
                : undefined,
            transaction.reference,
            transaction.amount,
            transaction.currency,
            transaction.date
        )
    }
}

namespace TransactionSummary {
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
