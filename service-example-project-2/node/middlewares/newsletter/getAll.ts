/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAll(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { newsletter: Newsletter },
  } = ctx
  const resp = await Newsletter.getAll()

  ctx.status = 200
  ctx.body = resp
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
