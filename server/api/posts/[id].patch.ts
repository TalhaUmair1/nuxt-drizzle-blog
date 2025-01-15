import { eq } from 'drizzle-orm'
import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string(),
    description: z.string(),
    isPublished: z.number().int().min(0).max(1),
  })
  const params = await useValidatedParams(event, {
    id: zh.intAsString,
  })

  const { id } = params
  const { title, description, isPublished } = body

  const post = await useDatabase()
    .update(tables.posts)
    .set({
      title,
      content: description,
      isPublished,
    })
    .where(eq(tables.posts.id, id))
    .returning()
    .get()

  return post
})
