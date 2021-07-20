/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { status: statusClient },
  } = ctx

  console.info('Received code:', code)

  const statusResponse = await statusClient.getStatus(String(code))

  console.info('Status response:', statusResponse)

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(String(code))

  console.info('Status headers', headers)
  console.info('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
