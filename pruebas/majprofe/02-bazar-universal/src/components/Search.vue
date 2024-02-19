<template>
    <main class="flex flex-col items-center justify-top h-screen m-4">
        <section class="flex">
          <router-link to="/">
            <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
          </router-link>   
          <form @submit.prevent="searchProducts">
              <div class="flex items-center leading-7 relative max-w-190">
                <svg class="absolute left-4 text-gray-500 w-4 h-4" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
                </svg>
                <input v-model="search" placeholder="Search" type="text" class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
              </div>
            </form>

        </section>
        <section class="flex flex-col items-start m-4">
          <p class="text-gray-600 font-bold">Resultados de búsqueda de "{{ search }}": {{ productos.length }}</p>
          <span v-for="categoria in categorias" :key="categoria.nombre" class="m-2 mb-4" :class="categoria.color">{{ categoria.icono }} {{ categoria.nombre }}</span>
          <ul>
            <li @click="mostrarInfo(producto.id)" class="flex max-w-xl p-2" v-for="producto in productos" :key="producto.id">
              <img class="rounded-full h-20 w-20 min-w-20" :src="producto.thumbnail" :alt="producto.title">
              <div class="ml-5">
               <h3 class="font-bold text-xl">{{ producto.title }}</h3>
               <p>{{ producto.description }}</p>
               <div class="flex">
                <p class="mr-4 font-bold text-xl">{{ producto.price }}$</p>
                <span v-for="(index, i) in Math.floor(producto.rating)" :key="i">
                 <img class="h-4" src="/estrella.png" alt="">
                </span>
                <!-- Mostrar media estrella si la puntuación tiene parte decimal -->
                <span v-if="producto.rating % 1 !== 0">
                  <img class="h-4" src="/mediaestrella.png" alt="">
                </span>
               </div>
              </div>

            </li>
          </ul>

        </section>

    </main>
</template>

<script setup lang="ts">
import caravana from '/caravan.svg'
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { Producto, Categoria } from '../types/types'

const route: RouteLocationNormalizedLoaded = useRoute()
const router = useRouter()
const search: { value: string } = ref('')
const productos = ref<Producto[]>([]);

// Obtener el parámetro 'q' de la URL
if (route.query.q) {
    search.value = route.query.q.toString()
}

const categoriasTipos: Categoria[] = [
  {
    nombre: 'smartphones',
    icono: '📱',
    color: 'bg-pink-200'
  },
  {
    nombre: 'laptops',
    icono: '💻',
    color: 'bg-blue-200'
  },
  {
    nombre: 'fragrances',
    icono: '🌸',
    color: 'bg-green-200'
  },
  {
    nombre: 'skincare',
    icono: '🧴',
    color: 'bg-yellow-200'
  },
  {
    nombre: 'groceries',
    icono: '🍞',
    color: 'bg-red-200'
  },
  {
    nombre: 'home-decoration',
    icono: '🏠',
    color: 'bg-purple-200'
  }
]


const searchProducts = async () => {
  try{
    const response = await fetch(`https://api-bazar-universal-r5ng.onrender.com/items/?q=${search.value}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    productos.value = data
  } catch (error) {
    console.error(error)
  }

}

onMounted(async () => {
    await searchProducts()
})

const categorias = computed (()=>{
  const categoriasPresentes: Categoria[] = []

  // Iterar sobre las categorías predefinidas
  for (const categoria of categoriasTipos) {
    // Verificar si la categoría está presente en los productos
    if (productos.value.some((producto: Producto) => producto.category === categoria.nombre)) {
      categoriasPresentes.push(categoria)
    }
  }

  return categoriasPresentes
})

const mostrarInfo = (productoId: number) => {
  // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
  router.push({ path: '/info', query: { id: productoId.toString() } });
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
  span{
    padding: 0.25rem;
  }
</style>