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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions">
                    <td>{{ transaction.reference }}</td>
                    <td>
                        <div class="badge badge-outline border-2" :style="{ borderColor: '#' + transaction.categoryColor }">
                            {{ transaction.category }}
                        </div>
                    </td>
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.amount }} {{ transaction.currency }}</td>
                    <NuxtLink :to="'/transactions/' + transaction.id"><td>&#128073;</td></NuxtLink>
                </tr>
            </tbody>
        </table>
    </div>
</template>
