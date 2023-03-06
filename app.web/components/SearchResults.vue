<script setup>
const props = defineProps(['transactions'])
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Reference</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <SearchResultItem v-for="transaction in transactions" :key="transaction.id"
                    :reference="transaction.reference" :category="transaction.category"
                    :categoryColor="transaction.categoryColor" :date="transaction.date" :amount="transaction.amount"
                    :currency="transaction.currency" />
            </tbody>
        </table>
    </div>
</template>
