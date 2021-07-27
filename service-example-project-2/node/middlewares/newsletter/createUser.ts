/* eslint-disable vtex/prefer-early-return */
export async function createUser(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { newsletter: Newsletter },
  } = ctx

  if (window !== undefined) {
    const valueEmail = (document.getElementById(
      'campoEmail'
    ) as HTMLInputElement).value

    const valueName = (document.getElementById('campoNome') as HTMLInputElement)
      .value

    console.log('ValueName====>', valueName)
    console.log('ValueEmail====>', valueEmail)
    console.log(window)
    const resp = await Newsletter.create({ name: valueName, email: valueEmail })

    ctx.status = 200
    ctx.body = resp
    ctx.set('Cache-Control', 'no-cache')

    await next()
  }
}
