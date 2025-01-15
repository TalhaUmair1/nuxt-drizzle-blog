import { z } from 'zod'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDatabase()

  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }).parse
  )

  const user = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  if (!(await verifyPassword(user.password, password))) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  return user
})
