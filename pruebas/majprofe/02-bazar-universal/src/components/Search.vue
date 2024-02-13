<template>
    <main class="flex flex-col items-center justify-top h-screen m-4">
        <section class="flex">
            <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
            <div class="flex items-center leading-7 relative max-w-190">
                <svg class="absolute left-4 text-gray-500 w-4 h-4" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
                </svg>
                <input placeholder="Search" type="search" class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
            </div>
        </section>
        <section>
            <p>Resultados de búsqueda de {{ search }}</p>

        </section>

    </main>
</template>

<script setup lang="ts">
import caravana from '/caravan.svg'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const search = ref('')

// Obtener el parámetro 'q' de la URL
if (route.query.q) {
    search.value = route.query.q.toString()
}
</script>

<style focus>
  .input::placeholder {
    color: #9e9ea7;
  }

  .input:focus, .input:hover {
    outline: none;
    border-color: rgba(234,76,137,0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
  }
</style>