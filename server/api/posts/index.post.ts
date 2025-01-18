import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, {
    title: z.string(),
    content: z.string(),
    is_published: z.number().int().min(0).max(1),
  })

  const { title, content, is_published } = body

  const post = await useDatabase()
    .insert(tables.posts)
    .values({
      title,
      content,
      is_published,
    })
    .returning()

  return post
})
