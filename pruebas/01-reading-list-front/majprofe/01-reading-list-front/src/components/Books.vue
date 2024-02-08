<script setup lang="ts">
import { computed, ref } from 'vue';
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

const genre = ref('');
const handleChanges = (event: Event) => {
    const target = event.target as HTMLSelectElement
    genre.value = target.value
    console.log(genre.value);
}

const matches = computed(() =>{
    if(genre.value === ''){
        return books
    }
    return books.filter((book) => book.genre === genre.value)
})

</script>

<template>
    <article class="grid gad-4">
        <nav>
            <select  @change="handleChanges">
                <option value="">Todos</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Ciencia ficción">Ciencia ficción</option>

            </select>
        </nav>
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
            <li v-for="book in matches" :key="book.ISBN">
                <img class="aspect-[9/14] object-cover" :src="book.cover" :alt="book.title">
                <p>{{ book.title }}</p>
            </li>
        </ul>
    </article>
</template>