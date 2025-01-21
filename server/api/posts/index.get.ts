import { eq } from 'drizzle-orm'
export default defineEventHandler(async (event) => {
  // const { user } = await requireUserSession(event)
  // console.log('user', user)

  const { page = 1, pageSize = 3 } = getQuery(event)

  console.log('page', page)
  console.log('pageSize', pageSize)

  const db = useDatabase()
  const posts = await db
    .select()
    .from(tables.posts)
    // .where(eq(tables.posts.userId, user.id))
    .orderBy(tables.posts.createdAt)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
  // console.log('posts', posts)
  return posts
})
