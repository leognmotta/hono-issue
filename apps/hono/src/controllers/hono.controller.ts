
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const OPERATION_ID = 'create.action_version'

const CreateActionSchema = z.object({
  hono: z.string()
})

const ResponseSchema = z.object({success: z.boolean(), data: CreateActionSchema })

const ParamsSchema = z.object({
  appId: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'appId',
        in: 'path',
      },
    }),
  versionId: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'versionId',
        in: 'path',
      },
    }),
})

export const createActionRoute = new OpenAPIHono().openapi(
  createRoute({
    method: 'post',
    path: '/{appId}/version/{versionId}/actions',
    tags: ['Apps'],
    description: 'Create a new action.',
    operationId: OPERATION_ID,
    request: {
      params: ParamsSchema,
      body: {
        content: {
          'application/json': {
            schema: CreateActionSchema,
          },
        },
        required: true,
        description: 'Payload for creating body',
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: ResponseSchema,
          },
        },
        description: 'Create a Action.',
      }
    },
  }),
  async (c) => {
    const body = c.req.valid('json')
    const { appId, versionId } = c.req.valid('param')

    return c.json({ success: true, data: body }, 201)
  },
)
