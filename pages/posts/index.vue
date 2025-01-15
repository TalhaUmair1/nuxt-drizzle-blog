<template>
    <div>
        <CardList :posts="posts" />
    </div>
</template>

<script setup>
const { data: posts } = await useFetch('/api/posts')
console.log('posts', posts)
</script>
