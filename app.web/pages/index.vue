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

const queryInput = ref({ input: { take: 10, skip: 0 } })
const { data: queryData } = await useAsyncQuery(query, queryInput.value)
const transactions = ref(queryData.value.transactionSummaries.transactions.map(trx => ({
    id: trx.id,
    reference: trx.reference,
    category: trx.category?.name,
    categoryColor: trx.category?.color,
    date: trx.date,
    amount: trx.amount,
    currency: trx.currency
})))

const searchHandler = async (searchInput) => {
    queryInput.value = {
        input: {
            take: 100,
            skip: 0,
            reference: searchInput.searchText ? searchInput.searchText : null,
            dateEnd: new Date(),
            dateStart: new Date(Date.now() - searchInput.dateRange * 24 * 60 * 60 * 1000),
            bank: searchInput.bank ? searchInput.bank : null,
            account: searchInput.account ? searchInput.account : null
        }
    }
    const { data: queryData } = await useAsyncQuery(query, queryInput.value)
    transactions.value = queryData.value.transactionSummaries.transactions.map(trx => ({
        id: trx.id,
        reference: trx.reference,
        category: trx.category?.name,
        categoryColor: trx.category?.color,
        date: trx.date,
        amount: trx.amount,
        currency: trx.currency
    }))
}
</script>

<template>
    <div class="container mx-auto">
        <div class="mt-5 md:mt-20">
            <h1 class="text-2xl font-bold">Friday Full-Stack Application</h1>
            <h3 class="text-m font-medium">Transaction Search</h3>
        </div>
        <div class="mt-5">
            <SearchInput @search="searchHandler" />
        </div>
        <div class="mt-4">
            <SearchResults :transactions="transactions" />
        </div>
    </div>
</template>
