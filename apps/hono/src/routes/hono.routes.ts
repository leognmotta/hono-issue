import {  OpenAPIHono } from '@hono/zod-openapi'
import { createActionRoute } from '../controllers/hono.controller'

export const honoRouter = new OpenAPIHono()
  .route('/', createActionRoute)