<template>
  <div>
    <HeroSection />
    <div class="bg-white py-14">
      <CardList :posts="posts" />
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useFetch('/api/posts')
console.log('posts', posts)
</script>

<style></style>