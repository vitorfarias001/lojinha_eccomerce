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
