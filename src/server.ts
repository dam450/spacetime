import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const port = Number(process.env.SERVER_PORT) || 3000
const jwtConfig = { secret: process.env.JWT_SECRET }
const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, jwtConfig)

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app.get('/', async (req, res) => {
  res.status(200).send({ server: 'online' })
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`🚀 HTTP Server running on:  http://localhost:${port}`)
  })
