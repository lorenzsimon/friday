export interface TransactionSummary {
    readonly id: string,
    readonly category?: TransactionSummary.Category,
    readonly reference?: string,
    readonly amount?: number,
    readonly currency?: string,
    readonly date?: string
}

namespace TransactionSummary {
    export interface Category {
        readonly name?: string,
        readonly color?: string
    }
}
