import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const port = 3333

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

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
