export interface TransactionDetail {
    readonly id: string,
    readonly account?: TransactionDetail.Account,
    readonly category?: TransactionDetail.Category,
    readonly reference?: string,
    readonly amount?: number,
    readonly currency?: string,
    readonly date?: string
}

namespace TransactionDetail {
    export interface Account {
        readonly name?: string,
        readonly bank?: string
    }

    export interface Category {
        readonly name?: string,
        readonly color?: string
    }
}
