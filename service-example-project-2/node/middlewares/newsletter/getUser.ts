/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
export async function getUser(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { newsletter: Newsletter },
  } = ctx

  const { id } = ctx.vtex.route.params

  const resp = await Newsletter.get(id as string)
  ctx.status = 200
  ctx.body = resp
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
