<script setup>
const emit = defineEmits(['search'])

const searchInput = ref({
    searchText: null,
    bank: null,
    account: null,
    dateRange: null,
})

const onSearchInput = (event) => {
    event.preventDefault()
    emit('search', searchInput.value)
}
</script>

<template>
    <div class="flex justify-between items-center px-3 py-2 border border-base-content rounded-xl">
        <div>
            <label for="search" class="sr-only">Search</label>
            <input 
                @keyup.enter="onSearchInput" 
                type="text" 
                id="search" 
                name="search" 
                placeholder="Search" 
                v-model="searchInput.searchText"
                class="w-full px-4 py-2 border dark:border-0 rounded-lg focus:border-primary-focus text-sm" 
            />
        </div>
        <div class="flex items-center space-x-2">
            <div>
                <label for="bank" class="sr-only">Bank</label>
                <input 
                    @keyup.enter="onSearchInput" 
                    type="text" 
                    id="bank" 
                    name="bank" 
                    placeholder="Bank" 
                    v-model="searchInput.bank"
                    class="w-full px-4 py-2 border dark:border-0 rounded-lg focus:border-primary-focus text-sm" 
                />
            </div>
            <div>
                <label for="account" class="sr-only">Account</label>
                <input 
                    @keyup.enter="onSearchInput" 
                    type="text" 
                    id="account" 
                    name="account" 
                    placeholder="Account" 
                    v-model="searchInput.account"
                    class="w-full px-4 py-2 border dark:border-0 rounded-lg focus:border-primary-focus text-sm" 
                />
            </div>
            <div>
                <label for="date-range" class="sr-only">Date Range</label>
                <select 
                    @change="onSearchInput"
                    id="date-range" 
                    name="date-range" 
                    class="select select-ghost w-full font-normal"
                    v-model="searchInput.dateRange" 
                >
                    <option value=null selected>Date</option>
                    <option value=7>Last Week</option>
                    <option value=30>Last Month</option>
                    <option value=365>Last Year</option>
                </select>
            </div>
        </div>
    </div>
</template>
  