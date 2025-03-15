<template>
  <div>
    <HeroSection />
    <div class="bg-white py-14">
      <CardList :posts="posts" />
    </div>
    <div class="flex justify-center my-4">
      <UPagination :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
        :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Next', color: 'gray' }"
        v-model="page" :page-count="perPage" :total="6" />
    </div>
  </div>
</template>

<script setup>
const page = ref(1)
const perPage = ref(3)
const posts = ref([])

watch(page, async () => {
  const data = await $fetch(`/api/posts/list?pageSize=${perPage.value}&page=${page.value}`)
  console.log('data', data);

  posts.value = data
}, { immediate: true })
</script>

<style></style>