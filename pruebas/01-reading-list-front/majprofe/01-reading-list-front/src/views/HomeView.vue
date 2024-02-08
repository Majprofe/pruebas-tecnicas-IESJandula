<script setup lang="ts">
import Books from '@/components/Books.vue';
import FavoritesBooks from '@/components/FavoritesBooks.vue';
import { computed, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import data from '../books.json'
import type { Book } from '@/types/types'

const books: Book[] = data.library.map((data) => data.book);
const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))


const genre = ref('');
const booksList: Ref<Book[]> = ref<Book[]>(books);
const readList: Ref<Book[]> = ref<Book[]>([])


const handleChanges = (event: Event) => {
  const target = event.target as HTMLSelectElement
  genre.value = target.value

  if (genre.value === '') {
    booksList.value = books
  } else {
    booksList.value = books.filter((book) => book.genre === genre.value)
  }
}

watch(genre, (newValue) => {
  if (newValue !== '') {
    booksList.value = books.filter((book) => book.genre === newValue)
  } else {
    booksList.value = books
  }
})


const matches = computed(() => {
  if (genre.value === '') {
    return books
  }
  return books.filter((book) => book.genre === genre.value)
})

const handleBookClick = (bookISBN: string) => {
  const foundBookIndex = readList.value.findIndex((b) => b.ISBN === bookISBN);

  if (foundBookIndex !== -1) {
    // El libro ya está en la lista de lectura, así que lo eliminamos de esa lista y lo añadimos a booksList
    const foundBook = readList.value[foundBookIndex];
    readList.value.splice(foundBookIndex, 1);
    booksList.value.push(foundBook);
  } else {
    // El libro no está en la lista de lectura, así que lo añadimos a readList y lo eliminamos de booksList
    const foundBookIndexInBooksList = booksList.value.findIndex((b) => b.ISBN === bookISBN);
    if (foundBookIndexInBooksList !== -1) {
      const foundBook = booksList.value[foundBookIndexInBooksList];
      booksList.value.splice(foundBookIndexInBooksList, 1);
      readList.value.push(foundBook);
    }
  }

  localStorage.setItem('booksList', JSON.stringify(booksList.value))
  localStorage.setItem('readList', JSON.stringify(readList.value))
}

watch(() => localStorage.getItem('readList'), (newValue) => {
  readList.value = JSON.parse(newValue || '[]')
})

watch(() => localStorage.getItem('booksList'), (newValue) => {
  booksList.value = JSON.parse(newValue || '[]')
})


// Escuchar cambios en el LocalStorage en todas las pestañas
window.addEventListener('storage', (event) => {
  if (event.key === 'readList') {
    readList.value = JSON.parse(event.newValue || '[]');
  }
  if (event.key === 'booksList') {
    booksList.value = JSON.parse(event.newValue || '[]');
  }
});
</script>

<template>
  <article class="grid gap-4">
    <nav class="flex justify-around">
      <select @change="handleChanges">
        <option value="">Todos</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
      <h3 class="font-bold text-4xl">Favoritos:</h3>
    </nav>
    <section class="grid grid-cols-2 gap-4 w-auto">
      <Books :books="booksList" @book-click="handleBookClick" />
      <FavoritesBooks :books="readList" @book-click="handleBookClick" />
    </section>
  </article>
</template>
