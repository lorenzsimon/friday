<script setup>
const query = gql`
    query TransactionDetail($id: String!) {
        transactionDetail(id: $id) {
            reference
            amount
            currency
            date
            category {
                name
            }
            account {
                bank
                name
            }
        }
    }
`

const { id } = useRoute().params
const { data: queryData } = await useAsyncQuery(query, { id })
const { transactionDetail } = queryData.value
</script>

<template>
    <div class="hero min-h-screen">
        <div class="hero-content">
            <div class="">
                <div class="stats stats-vertical shadow">
                    <div class="stat">
                        <div class="stat-value">{{ transactionDetail.reference ?? id }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Bank</div>
                        <div class="stat-value font-normal text-2xl">{{ transactionDetail.account?.bank }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Account</div>
                        <div class="stat-value font-normal text-2xl">{{ transactionDetail.account?.name }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Category</div>
                        <div class="stat-value font-normal text-2xl">{{ transactionDetail.category?.name }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Amount</div>
                        <div class="stat-value font-normal text-2xl">{{ transactionDetail.amount }}</div>
                        <div class="stat-desc">{{ transactionDetail.currency }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Date</div>
                        <div class="stat-value font-normal text-2xl">
                            {{ new Date(transactionDetail.date).toDateString() }}
                        </div>
                        <div class="stat-desc">{{ new Date(transactionDetail.date).toTimeString() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
