<script setup>
const query = gql`
    query TransactionSummaries($input: TransactionSummariesInput!) {
      transactionSummaries(input: $input) {
        skip
        transactions {
          id
          reference
          date
          amount
          currency
          category {
            name
            color
          }
        }
      }
    }
`

let skip = 0
const take = 100
let queryInput = { input: { take: take, skip: skip } }
const { data: queryData } = await useAsyncQuery(query, queryInput)
const mapTransaction = (trx) => ({
    id: trx.id,
    reference: trx.reference,
    category: trx.category?.name,
    categoryColor: trx.category?.color,
    date: new Date(trx.date).toDateString(),
    amount: trx.amount,
    currency: trx.currency
})

const transactions = ref(queryData.value.transactionSummaries.transactions.map(mapTransaction))

const searchHandler = async (searchInput) => {
    queryInput = {
        input: {
            take: take,
            skip: (skip = 0),
            reference: searchInput.searchText ? searchInput.searchText : null,
            dateEnd: new Date(),
            dateStart: searchInput.dateRange ? new Date(Date.now() - searchInput.dateRange * 24 * 60 * 60 * 1000) : null,
            bank: searchInput.bank ? searchInput.bank : null,
            account: searchInput.account ? searchInput.account : null
        }
    }
    const { data: queryData } = await useAsyncQuery(query, queryInput)
    transactions.value = queryData.value.transactionSummaries.transactions.map(mapTransaction)
}

const loadMoreHandler = async () => {
    queryInput = {
        input: {
            ...queryInput.input,
            skip: (skip = skip + take)
        }
    }
    const { data: queryData } = await useAsyncQuery(query, queryInput)

    // TODO: Use reactive for better efficiency
    transactions.value = [...transactions.value, ...queryData.value.transactionSummaries.transactions.map(mapTransaction)]
}
</script>

<template>
    <div class="container mx-auto">
        <div class="mt-4 md:mt-10">
            <h1 class="text-4xl font-bold">Friday Full-Stack Application &#128640;</h1>
            <h3 class="text-xl font-medium">Transaction Search</h3>
        </div>
        <div class="mt-6">
            <SearchInput @search="searchHandler" />
        </div>
        <div class="mt-2">
            <SearchResults :transactions="transactions" />
        </div>
        <button @click="loadMoreHandler" class="btn btn-block btn-outline my-3">Load more</button>
    </div>
</template>
