<template>
    <main class="flex flex-col items-center justify-center h-screen">
        <img :src="caravana" alt="Caravana icon">
        <h1 class="text-4xl font-bold mb-4">Bazar Online</h1>
        <input v-model="searchQuery" class="mb-4" type="text" placeholder="laptos, smartphones, ...">
        <button @click="search" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Buscar</button>
    </main>
</template>

<script setup lang="ts">
import caravana from '/caravan.svg'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const route = useRouter()
const searchQuery = ref('')
const search = () => {
    if (searchQuery.value.trim() !== ''){
        // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
        route.push({ path: '/search', query: { q: searchQuery.value } })
    }
}
</script>