<template>
  <div class="flex flex-col items-center bg-purple-50 mx-4">
    <img :src="`/${post.image}`" alt="" class="" />
    <div class="text-start my-4">
      <h1 class="text-4xl text-black font-semibold">{{ post.title }}</h1>
    </div>
    <div class="flex flex-col items-center ">
      <div class=" mx-32 my-6">
        <p v-html="post.content"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { id } = useRoute().params
const { data: post } = await useFetch(`/api/posts/${id}`)
</script>

<style></style>