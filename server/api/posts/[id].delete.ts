import { eq } from 'drizzle-orm'
import { useValidatedParams, zh } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const params = await useValidatedParams(event, {
    id: zh.intAsString,
  })

  const { id } = params
  const post = await useDatabase()
    .delete(tables.posts)
    .where(eq(tables.posts.id, id))
    .returning()
    .get()

  return post
})
