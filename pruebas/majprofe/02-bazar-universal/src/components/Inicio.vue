<template>
    <main class="flex flex-col items-center justify-center h-screen">
        <img :src="caravana" alt="Caravana icon">
        <h1 class="text-4xl font-bold mb-4">Bazar Online</h1>
        <div class="flex items-center leading-7 relative max-w-190 m-4">
            <svg class="absolute left-4 text-gray-500 w-4 h-4" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
            </svg>
            <input v-model="searchQuery" placeholder="Search" type="search" class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
        </div>
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