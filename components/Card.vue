<template>
    <NuxtLink :to="`/posts/${card.id}`">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-green-800 dark:border-gray-700">
            <a href="#">
                <img :src="`${card.image}`" />
            </a>
            <div>
                <h2 class="my-2 text-xl text-red-600 mx-6">
                    {{ card.createdAt }}
                </h2>
            </div>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ card.title }}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-white">{{ card.content }} </p>

                <a href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    card: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped></style>