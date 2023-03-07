export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo'
    ],
    apollo: {
        clients: {
            default: {
                httpEndpoint: process.env.APOLLO_BASE_URL || 'http://localhost:8080/graphql'
            }
        }
    }
})
