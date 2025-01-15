<template>
  <div class="pt-36 flex flex-col items-center bg-purple-50">
    <img :src="post?.image" alt="" class="" />
    <div class="text-start mb-24">
      <h1 class="text-4xl text-black font-semibold">{{ post.title }}</h1>
    </div>
    <div class="flex flex-col items-center ">
      <div class=" mt-20">
        <p v-html="post.content"></p>
      </div>

      <div>
        <h1 class="text-2xl font-bold mt-7 ">Leave a Comment</h1>
        <p class="mb-7">
          Leave a Comment Your email address will not be published. Required
          fields are marked *
        </p>
        <textarea rows={10} cols={40} class="bg-pink-200 mb-4" name="" id=""></textarea>
      </div>
      <div class="flex gap-6">
        <input class="py-3 px-6 border border-black bg-pink-100" type="text" placeholder="Enter Name" />
        <input class="py-3  px-6 border border-black  bg-pink-100" type="Email" placeholder="Email" />
        <input class="py-3  px-6 border border-black  bg-pink-100" type="text" placeholder="Email" />
      </div>
    </div>
    <div class="ml-80 mt-5 mb-14">
      <button type="button" class="py-4 px-12 bg-red-600 rounded-sm text-white">
        Post Comment
      </button>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params
const { data: post } = await useFetch(`/api/posts/${id}`)
</script>

<style></style>