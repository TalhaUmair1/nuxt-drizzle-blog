import { useValidatedParams, zh } from 'h3-zod'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  })
  const db = await useDatabase()

  const post = await db
    .select()
    .from(tables.posts)
    .where(eq(tables.posts.id, id))
    .get()

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return post
})
