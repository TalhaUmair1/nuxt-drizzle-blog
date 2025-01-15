export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const posts = await db.select().from(tables.posts).all()
  console.log('posts', posts)
  return posts
})
