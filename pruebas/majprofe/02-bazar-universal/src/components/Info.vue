<template>
    <main class="flex flex-col items-center justify-top h-screen m-4">
        <header class="flex">
            <router-link to="/">
                <img class="h-12 mr-4" src="/caravan.svg" alt="Caravana icon">
            </router-link>
            <form @submit.prevent="searchProducts">
                <div class="flex items-center leading-7 relative max-w-190">
                    <svg class="absolute left-4 text-gray-500 w-4 h-4" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                            </path>
                        </g>
                    </svg>
                    <input v-model="searchQuery" placeholder="Search" type="text"
                        class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
                </div>
            </form>
        </header>
        <section class="grid grid-cols-2 gap-4 m-10">
            <div>
                <img class="rounded-full h-40 w-40 object-cover" :src="producto?.thumbnail" :alt="producto?.title">
            </div>
            <div class="overflow-y-auto max-h-40 max-w-20 scrollbar">
                <img @click="cambiaImagen" v-for="(imagen, index) in producto?.images" :src="imagen" :alt="`Imagen ${index.toString}`"
                    class="rounded-full h-12 w-12 object-cover m-1">
            </div>
        </section>
        <section class="flex items-center flex-col">
            <h1 class="text-2xl font-bold">{{ producto?.title }}</h1>
            <div class="flex">
                <div>
                    <p class="mr-4 font-bold text-xl">{{ producto?.price }}$</p>
                    <p class="text-xs text-gray-600">{{ producto?.stock }} disponibles</p>
                </div>
                <div class="flex">
                    <span v-for="(index, i) in Math.floor(producto?.rating || 0)" :key="index">
                        <img class="h-4" src="/estrella.png" alt="">
                    </span>
                    <!-- Mostrar media estrella si la puntuación tiene parte decimal -->
                    <span v-if="producto?.rating % 1 !== 0">
                        <img class="h-4" src="/mediaestrella.png" alt="">
                    </span>
                </div>
            </div>

            <p class="max-w-80 text-xs text-gray-600 m-5">{{ producto?.description }}</p>

        </section>
    </main>
</template>

<script setup lang="ts">
import { Producto } from '../types/types'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
const route: RouteLocationNormalizedLoaded = useRoute()

const search: { value: string } = ref('')
// Obtener el parámetro 'q' de la URL
if (route.query.id) {
    search.value = route.query.id.toString()
}
const producto = ref<Producto | null>(null)
const searchQuery: { value: string } = ref('')
const router = useRouter()

const searchProduct = async () => {
    try {
        const response = await fetch(`https://api-bazar-universal-r5ng.onrender.com/item/${search.value}`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        producto.value = data
        console.log(producto.value)
    } catch (error) {
        console.error(error)
    }
}

onMounted(async () => {
    await searchProduct()
})

const searchProducts = () => {
    if (searchQuery.value.trim() !== '') {
        // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
        router.push({ path: '/search', query: { q: searchQuery.value } })
    }
}

const cambiaImagen = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement
    producto.value = { ...producto.value, thumbnail: target.src }
}
</script>

<style focus>
/* Estilos personalizados para la barra de desplazamiento */
.scrollbar::-webkit-scrollbar {
    width: 8px;
    /* Ancho de la barra de desplazamiento */
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    /* Color del pulgar (la parte móvil de la barra) */
    border-radius: 4px;
    /* Bordes redondeados del pulgar */
}

.scrollbar::-webkit-scrollbar-track {
    background-color: #f3f4f6;
    /* Color de la pista (la parte fija de la barra) */
    border-radius: 4px;
    /* Bordes redondeados de la pista */
}
</style>