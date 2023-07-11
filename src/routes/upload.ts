import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 1_048_576, // 1MB
      },
    })

    if (!upload) {
      return reply.status(400).send({
        statusCode: 400,
        code: 'NO_FILE',
        error: 'No file',
        message: 'No file',
      })
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z0-9]+/
    const isValidFileType = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileType) {
      return reply.status(400).send({
        statusCode: 400,
        code: 'INVALID_FILE_TYPE',
        error: 'Invalid file type',
        message: 'Invalid file type',
      })
    }

    const fileID = randomUUID()
    const extension = extname(upload.filename)
    const filename = fileID.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', filename),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()

    return reply.status(201).send({ fileUrl })
  })
}
