<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import data from '../books.json'
type Book = {
    title: string;
    pages: number;
    genre: string;
    cover: string;
    synopsis: string;
    year: number;
    ISBN: string;
    author: {
        name: string;
        otherBooks: string[];
    };
};
const books: Book[] = data.library.map((data) => data.book);
const genres: string[] = Array.from(new Set(books.map((book) => book.genre))) 


const genre = ref('');
const handleChanges = (event: Event) => {
    const target = event.target as HTMLSelectElement
    genre.value = target.value
    console.log(genre.value);
}

const readList: Ref<string[]> = ref([])

const matches = computed(() =>{
    if(genre.value === ''){
        return books
    }
    return books.filter((book) => book.genre === genre.value)
})

const handleBookClick = (book: string) => {
    readList.value = readList.value.includes(book) ? readList.value.filter((isbn) => isbn !== book) : [...readList.value, book]
    localStorage.setItem('readList', JSON.stringify(readList.value))
}

watchEffect(() => {
    readList.value = JSON.parse(localStorage.getItem('readList') || '[]')
})

// Escuchar cambios en el LocalStorage en todas las pestañas
window.addEventListener('storage', (event) => {
    if (event.key === 'readList') {
        readList.value = JSON.parse(event.newValue || '[]');
    }
});

</script>

<template>
    <article class="grid gap-4">
        <nav>
            <select  @change="handleChanges">
                <option value="">Todos</option>
                <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
            </select>
        </nav>
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
            <li v-for="book in matches" :key="book.ISBN" class="grid gap-2" @click="handleBookClick(book.ISBN)">
                <img class="aspect-[9/14] object-cover" :src="book.cover" :alt="book.title">
                <p>
                    <span v-if="readList.includes(book.ISBN)">⭐</span>
                    {{ book.title }}
                </p>
            </li>
        </ul>
    </article>
</template>