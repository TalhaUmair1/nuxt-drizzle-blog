<template>
    <div class="w-full">
        <div
            class="w-full bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 flex flex-col justify-center items-center h-screen">
            <UForm :schema="schema" :state="state" class="max-w-md w-full " @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" placeholder="Email" size="lg" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" placeholder="Password" type="password" size="lg" />
                </UFormGroup>

                <UButton class="my-5 py-2 px-6 " type="submit">
                    Submit
                </UButton>
                <p>you have no account <NuxtLink class="text-blue-600 underline" to="/register">Register</NuxtLink>
                </p>
            </UForm>
        </div>
    </div>

</template>

<script setup>
import { z } from 'zod'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})


const state = reactive({
    email: undefined,
    password: undefined
})

const { fetch } = useUserSession()

async function onSubmit(event) {
    // Do something with data
    console.log(event.data)
    $fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(event.data)
    }).then(() => {
        fetch()
        navigateTo('/dashboard')
    })
}
</script>

<style scoped></style>