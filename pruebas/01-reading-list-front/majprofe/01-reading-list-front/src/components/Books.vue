<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Book } from '@/types/types';

const props = defineProps<{
  books: Book[];
}>();

const emit = defineEmits(['book-click']);
const handleBookClick = (book: string) => {
  emit('book-click', book);
}
</script>

<template>
    <article class="">
        <ul class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-2">
            <li v-for="book in books" :key="book.ISBN" class="grid gap-2" @click="handleBookClick(book.ISBN)">
                <img class="aspect-[9/14] object-cover" :src="book.cover" :alt="book.title">
                <p>
                    {{ book.title }}
                </p>
            </li>
        </ul>
    </article>
</template>