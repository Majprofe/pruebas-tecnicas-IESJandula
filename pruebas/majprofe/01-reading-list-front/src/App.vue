<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="grid px-4 m-auto max-w-screen-lg min-h-screen grid-rows-[60px,1fr,60px] gap-4">
    <nav class="flex items-center text-3xl">📚 Libros</nav>
    <section>
      <RouterView />
    </section>
    <footer class="flex items-center justify-center">Designed with 🩶 by Manuel</footer>
  </main>

</template>

<style scoped>

</style>
