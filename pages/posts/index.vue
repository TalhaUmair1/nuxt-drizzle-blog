<template>
    <div>
        <CardList :posts="posts" />
        <div class="flex justify-center">
            <UPagination v-model="page" :page-count="perPage" :total="posts.length" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})
const page = ref(1)
const perPage = ref(3)

const { data: posts } = await useFetch('/api/posts')
console.log('posts', posts)


</script>
