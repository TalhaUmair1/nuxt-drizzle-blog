import { asc, sql } from 'drizzle-orm'
import { useValidatedParams, useValidatedQuery, z, zh } from 'h3-zod'
export default defineEventHandler(async (event) => {
  // const { user } = await requireUserSession(event)
  // console.log('user', user)
  const { page = 1, pageSize = 10 } = await useValidatedQuery(event, {
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  })

  // const page = 1
  // const pageSize = 3

  console.log('page', page)
  console.log('pageSize', pageSize)

  const db = useDatabase()
  const posts = await db
    .select({
      id: tables.posts.id,
      title: tables.posts.title,
      image: tables.posts.image,
      content: sql<string>`substr(${tables.posts.content}, 1, 60)`.as(
        'content'
      ),
    })
    .from(tables.posts)
    // .where(eq(tables.posts.userId, user.id))
    .orderBy(asc(tables.posts.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  console.log('posts', posts?.length)
  return posts
})
