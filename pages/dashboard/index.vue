<template>
    <div>
        <!-- // Add blog btn// -->
        <div class="flex justify-between items-center p-6 bg-white shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800">Your Posts</h2>
            <button @click="showModal"
                class="px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 transition-colors duration-300">
                Add Post
            </button>
        </div>

        <!-- // blog tabel /// -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <!-- Table Header -->
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Is Published</th>
                        <th scope="col" class="px-6 py-3">Edit</th>
                        <th scope="col" class="px-6 py-3">Delete</th>
                    </tr>
                </thead>
                <!-- // Table Body// -->
                <tbody>
                    <tr v-for="post in posts" :key="post.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ post.title }}
                        </th>
                        <td class="px-6 py-4">
                            {{ post.content }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.is_published ? "Yes" : "No" }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click="editPost(post)" class="text-green-600">Edit post</button>
                        </td>
                        <td class="px-6 py-4">
                            <button @click="deletePost(post.id)" class="text-red-600">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- add blog here -->
        <div v-if="modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <!-- Modal content -->
            <div
                class="relative bg-gradient-to-r from-purple-600 to-green-400 rounded-lg shadow-lg p-8 w-full max-w-md">
                <div class="flex items-center justify-between mb-4 text-white">
                    <h3 class="text-lg font-semibold">Create New Blog Post</h3>
                    <button @click="modal = false"
                        class="text-white hover:bg-gray-200 hover:text-gray-900 rounded-full p-1"
                        aria-label="Close modal">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <UForm :schema="schema" :state="state" @submit="addPost" class="space-y-4">
                    <div>
                        <UFormGroup label="Blog Title" name="title">
                            <UInput v-model="state.title" placeholder="title here" size="lg" />
                        </UFormGroup>
                    </div>

                    <div>
                        <UFormGroup label="Blog content" name="content">
                            <UTextarea v-model="state.content" placeholder=" Blog content here" color="white"
                                size="lg" />
                        </UFormGroup>
                    </div>

                    <UFormGroup label="Publishing" name="is_published">
                        <USelect v-model="state.is_published" option-attribute="label" option-value-attribute="value"
                            color="primary" variant="outline" placeholder="Publishing" :options="[
                                { label: 'Yes', value: 1 },
                                { label: 'No', value: 0 },
                            ]" />
                    </UFormGroup>

                    <UButton type="submit"> Submit </UButton>
                </UForm>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { z } from "zod";

const modal = ref(false);

const showModal = () => {
    modal.value = !modal.value;
};

const { data: posts } = await useFetch("/api/posts");
console.log("posts", posts);

const schema = z.object({
    title: z.string(),
    content: z.string(),
    is_published: z.coerce.number().int().min(0).max(1),
});

const initialState = {
    title: "",
    content: "",
    is_published: 0,
};
let state = reactive(initialState);

const addPost = async (event) => {
    console.log(event.data);
    if (state.id) {
        const data = await $fetch(`api/posts/${state.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                id: state.id,
                title: state.title,
                content: state.content,
                is_published: state.is_published,
            }),
        });
        console.log(data);
        if (data) {
            modal.value = false;
            posts.value = posts.value.map((post) => {
                if (post.id === data.id) {
                    return data;
                }
                return post;
            })
            state.id = "";
            state.title = "";
            state.content = "";
            state.is_published = 0;
        }
    }
    else {
        const data = await $fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(event.data),
        });
        console.log(data);
        if (data) {
            modal.value = false;
            posts.value.push(data[0]);
            state.title = "";
            state.content = "";
            state.is_published = 0;
        }
    }

};
const deletePost = async (id) => {
    const data = await $fetch(`api/posts/${id}`, {
        method: "DELETE",
    });
    console.log(data);
    if (data)
        posts.value = posts.value.filter((post) => post.id !== id);
};
const editPost = (post) => {
    console.log(post);
    state.id = post.id;
    state.title = post.title;
    state.content = post.content;
    state.is_published = post.is_published;
    modal.value = true;
    console.log(state);

}
</script>

<style lang="scss" scoped></style>
