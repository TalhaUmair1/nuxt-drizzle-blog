import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const db = useDatabase()

  const { name, email, password } = await readValidatedBody(
    event,
    z.object({
      name: z.string().min(4),
      email: z.string().email(),
      password: z.string().min(6),
    }).parse
  )

  const hashedPassword = await hashPassword(password)

  const user = await db
    .insert(tables.users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning()
    .get()

  await setUserSession(event, {
    user: {
      id: user.id,
      name,
      email,
    },
    loggedInAt: Date.now(),
  })

  return setResponseStatus(event, 201)
})
