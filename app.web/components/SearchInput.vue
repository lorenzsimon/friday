<script setup>
const emit = defineEmits(['search'])

const searchInput = ref({
    searchText: null,
    bank: null,
    account: null,
    dateRange: 7,
})

const onSearchInput = (event) => {
    event.preventDefault();
    emit('search', searchInput.value);
}
</script>

<template>
    <div class="flex justify-between items-center px-3 py-2 border rounded-xl">
        <div>
            <label for="search" class="sr-only">Search</label>
            <input type="text" id="search" name="search" placeholder="Search" v-model="searchInput.searchText"
                @keyup.enter="onSearchInput" class="w-full px-4 py-2 rounded-lg focus:border-blue-300 text-sm" />
        </div>
        <div class="flex items-center space-x-2">
            <div>
                <label for="bank" class="sr-only">Bank</label>
                <input type="text" id="bank" name="bank" placeholder="Bank" v-model="searchInput.bank"
                    @keyup.enter="onSearchInput" class="w-full px-4 py-2 rounded-lg focus:border-blue-300 text-sm" />
            </div>
            <div>
                <label for="account" class="sr-only">Account</label>
                <input type="text" id="account" name="account" placeholder="Account" v-model="searchInput.account"
                    @keyup.enter="onSearchInput" class="w-full px-4 py-2 rounded-lg focus:border-blue-300 text-sm" />
            </div>
            <div>
                <label for="date-range" class="sr-only">Date Range</label>
                <select id="date-range" name="date-range" class="select select-ghost w-full font-normal"
                    v-model="searchInput.dateRange" @change="onSearchInput">
                    <option value=7 selected>Last 7 days</option>
                    <option value=30>Last 30 days</option>
                    <option value=90>Last 90 days</option>
                </select>
            </div>
        </div>
    </div>
</template>
  