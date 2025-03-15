<template>
    <div>
        <!-- Header section with "Add Post" button -->
        <div class="flex justify-between items-center p-6 bg-white shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800">Your Posts</h2>
            <button @click="showModal"
                class="px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500 transition-colors duration-300">
                Add Post
            </button>
        </div>

        <!-- Blog Table -->
        <div>
            <UTable :columns="columns" :rows="posts || []">
                <template #image-data="{ row }">
                    <img :src="row.image" class="w-10 h-10 rounded-full" />
                </template>
                <template #content-data="{ row }">
                    <span>{{ row.content.length > 50 ? row.content.slice(0, 50) + '...' : row.content }}</span>
                </template>
                <template #actions-data="{ row }">
                    <div class="flex gap-2">
                        <UButton color="primary" size="sm" @click="editPost(row)">Edit</UButton>
                        <UButton color="red" size="sm" @click="deletePost(row.id)">Delete</UButton>
                    </div>
                </template>
            </UTable>
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="posts.length" />
            </div>
        </div>

        <div>
            <UModal v-model="modal" prevent-close>
                <div class="p-4">
                    <div class="flex justify-between pb-2">
                        <h2 class="text-2xl font-bold text-gray-800">Add Post</h2>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="modal = false" />
                    </div>
                    <UForm :schema="schema" @error="(error) => console.log('error', error)" :state="state"
                        @submit="addPost" class="flex flex-col gap-3">
                        <UFormGroup label="Title" name="title">
                            <UInput v-model="state.title" placeholder="Title" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Content" name="content">
                            <UTextarea v-model="state.content" :rows="6" placeholder="Content" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Image" name="image">
                            <UInput @change="onFileChange" type="file" placeholder="Image" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Published" name="is_published">
                            <USelect v-model="state.is_published"
                                :options="[{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }]" />
                        </UFormGroup>
                        <div>
                            <UButton class="my-5 py-2 px-6 " label="Submit" type="submit" />
                        </div>
                    </UForm>
                </div>
            </UModal>
        </div>

    </div>
</template>
<script setup>
import { ref } from "vue";
import { z } from "zod";

definePageMeta({
    middleware: 'auth'
})
const page = ref(1)
const perPage = 5



const columns = [
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'image',
        label: 'Image',
    },
    {
        key: 'content',
        label: 'Description',
    },
    {
        key: 'is_published',
        label: 'Published'
    }, {
        key: 'actions',
        label: 'Actions'
    }
]

const modal = ref(false);

const showModal = () => {
    modal.value = !modal.value;
};
// watch(page, async () => {
//     const data = await $fetch(`/api/posts/list?pageSize=${perPage.value}&page=${page.value}`)
//     posts.value = data
// })
const { data: posts } = await useFetch("/api/posts?page=1&pageSize=5");
console.log("posts", posts);

const schema = z.object({
    title: z.string(),
    content: z.string(),
    is_published: z.coerce.number().int().min(0).max(1),
});

const initialState = {
    title: "",
    content: "",
    image: null,
    is_published: 0,
};
let state = reactive(initialState);

const addPost = async (event) => {
    console.log(event.data);
    console.log(state);

    if (state.id) {
        const data = await $fetch(`api/posts/${state.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                id: state.id,
                title: state.title,
                content: state.content,
                image: state.image,
                is_published: +state.is_published,
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
            state.image = null;
            state.is_published = 0;
        }
    }
    else {
        const data = await $fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                id: state.id,
                title: state.title,
                content: state.content,
                image: state.image,
                is_published: +state.is_published,
            }),
        });
        console.log(data);
        if (data) {
            modal.value = false;
            posts.value.push(data[0]);
            state.title = "";
            state.content = "";
            state.image = null;
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

const onFileChange = async (files) => {
    console.log(files);
    const image = files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await $fetch("/api/upload", {
        method: "POST",
        body: formData,
    })
    console.log(res);
    if (res.filename) {
        state.image = res.filename;
    }
};

const editPost = (post) => {
    state.id = post.id;
    state.title = post.title;
    state.content = post.content;
    state.image = post.image;
    state.is_published = post.is_published;
    showModal();
}
</script>
