<template>
    <div class="w-full">
        <div
            class="w-full bg-gradient-to-r from-teal-200 to-lime-200 flex flex-col justify-center items-center h-screen">
            <UForm :schema="schema" :state="state" class="max-w-md w-full " @submit="onSubmit">
                <UFormGroup label="Name" name="Name">
                    <UInput v-model="state.name" placeholder="Name" size="lg" />
                </UFormGroup>

                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" placeholder="Email" size="lg" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" placeholder="Password" type="password" size="lg" />
                </UFormGroup>

                <UButton class="my-5 py-2 px-6 " type="submit">
                    Submit
                </UButton>
                <p>you have account <NuxtLink class="text-blue-600 underline" to="/login">Login</NuxtLink>
                </p>
            </UForm>
        </div>
    </div>

</template>

<script setup>
import { z } from 'zod'

const schema = z.object({
    name: z.string().min(2, 'Must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})


const state = reactive({
    name: undefined,
    email: undefined,
    password: undefined
})

const { fetch } = useUserSession()

async function onSubmit(event) {
    $fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(event.data)
    }).then(() => {
        fetch()
        navigateTo('/dashboard')
    })
}


</script>

<style scoped></style>