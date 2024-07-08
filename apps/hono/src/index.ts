import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { honoRouter } from '@/routes/hono.routes'

const app = new OpenAPIHono()

const routes = app.route('/hono', honoRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export type AppType = typeof routes
