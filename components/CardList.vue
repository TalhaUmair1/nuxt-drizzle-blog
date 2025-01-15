<template>
    <div>
        <!-- // card ..// -->
        <div class=" flex cursor-pointer justify-center my-5 gap-5 flex-wrap">
            <Card v-for="card in posts" :key="card.id" :card="card" />
        </div>
        <!-- /// .../// -->
    </div>
</template>

<script setup>
const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})
</script>

<style scoped></style>