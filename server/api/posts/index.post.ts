import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string(),
    description: z.string(),
    isPublished: z.number().int().min(0).max(1),
  })

  const { title, description, isPublished } = body

  const post = await useDatabase()
    .insert(tables.posts)
    .values({
      title,
      content: description,
      isPublished,
    })
    .returning()

  return post
})
