<template>
  <div>
    <HeroSection />
    <div class="bg-white py-14">
      <CardList :posts="posts" />
    </div>
    <div class="flex justify-center my-4">
            <UPagination v-model="page" :page-count="perPage" :total="6" />
        </div>
  </div>
</template>

<script setup>
const page = ref(1)
const perPage = ref(3)
const { data: posts } = await useFetch('/api/posts', { query: { page: page.value, pageSize: perPage.value } })
console.log('posts', posts)

</script>

<style></style>