import { eq, and } from 'drizzle-orm'
import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string(),
    content: z.string(),
    is_published: z.number().int().min(0).max(1),
  })
  const params = await useValidatedParams(event, {
    id: zh.intAsString,
  })
  const { user } = await requireUserSession(event)
  const { id } = params
  const { title, content, is_published } = body

  const post = await useDatabase()
    .update(tables.posts)
    .set({
      title,
      content,
      is_published,
    })
    .where(and(eq(tables.posts.id, id), eq(tables.posts.userId, user.id)))
    .returning()
    .get()

  return post
})
