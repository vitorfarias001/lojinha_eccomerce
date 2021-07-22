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
  const users = await Newsletter.getByEmail(data.email) // substitui pela requisição da lista de usuários
  const equalEmails = users((user: { email: any }) => user.email === data.email)
  console.log(data)
  if (!equalEmails) {
    // se o array com emails iguais for vazio, faz o processo de registro das infos
  } else {
    // se o array possuir algum valor, envia uma mensagem de erro
    // enviar código do erro e mensagem
    console.log(`O email ${equalEmails[0]} já existe na base de dados`)
  }

  const resp = await Newsletter.create(data)

  ctx.status = 200
  ctx.body = resp
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
