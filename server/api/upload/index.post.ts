import fs from 'fs'
export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event)
  const image = data[0]

  console.log('data', image)

  if (!image) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const filename = `${new Date().getUTCMilliseconds()}-${image.filename}`

  fs.writeFileSync(`./public/${filename}`, image.data)

  return {
    message: 'File uploaded successfully',
    filename: filename,
  }
})
