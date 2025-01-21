import { eq, and } from 'drizzle-orm'
import { useValidatedParams, zh } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const params = await useValidatedParams(event, {
    id: zh.intAsString,
  })

  const { user } = await requireUserSession(event)

  const { id } = params
  const post = await useDatabase()
    .delete(tables.posts)
    .where(and(eq(tables.posts.id, id), eq(tables.posts.userId, user.id)))
    .returning()
    .get()

  return post
})
