/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import parser from 'co-body'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { newsletter: Newsletter },
  } = ctx
  const data = await parser(ctx.req)

  console.log(data)

  const resp = await Newsletter.create(data)

  ctx.status = 200
  ctx.body = resp
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
