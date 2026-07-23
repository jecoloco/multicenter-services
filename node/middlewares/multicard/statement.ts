import { json } from 'co-body'

export async function statement(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD STATEMENT ===================='
  )

  const origin = ctx.get('origin') || ''
  const referer = ctx.get('referer') || ''

  const allowedOrigins = [
    'https://simon--multicenter.myvtex.com',
    'https://multicenter.myvtex.com',
    'https://www.multicenter.com',
  ]

  const isAllowed = allowedOrigins.some(
    (o) => origin.startsWith(o) || referer.startsWith(o)
  )

  if (!isAllowed) {
    ctx.status = 403
    ctx.body = { error: 'Acceso no autorizado' }

    return
  }

  try {
    const body = await json(ctx.req)

    console.log('Body recibido:', body)

    const { token } = body
    const { documentNumber } = body

    if (!token || !documentNumber) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros token o documentNumber' }

      return
    }

    const response = await ctx.clients.multicardStatementClient.getStatementByDoc(
      token,
      documentNumber
    )

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en statement middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD STATEMENT ====================='
  )
  await next()
}
