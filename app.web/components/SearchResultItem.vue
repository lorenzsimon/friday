<script setup>
const props = defineProps([
    'reference',
    'category',
    'categoryColor',
    'date',
    'amount',
    'currency'
])
</script>

<template>
    <tr>
        <td>{{ props.reference }}</td>
        <td>
            <div class="badge badge-outline border-2" :style="{ borderColor: '#' + props.categoryColor }">
                {{ category }}
            </div>
        </td>
        <td>{{ date }}</td>
        <td>{{ amount }} {{ currency }}</td>
    </tr>
</template>
