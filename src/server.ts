import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

const port = 3333

app.get('/', async (req, res) => {
  res.status(200).send({ server: 'online' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).send({ users })
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`🚀 HTTP Server running on:  http://localhost:${port}`)
  })
