import { json } from 'co-body'

export async function messaging(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD MESSAGING ===================='
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

    const { token, phone, code, email, message } = body

    if (!token || (!phone && !code)) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros token, phone o code' }

      return
    }

    let response: any

    if (phone && !code) {
      response = await ctx.clients.multicardMessagingClient.sendOtp({
        token,
        phone,
        email,
        message,
      })
    } else if (code && phone) {
      response = await ctx.clients.multicardMessagingClient.validateOtp(
        token,
        code,
        phone
      )
    } else {
      ctx.status = 400
      ctx.body = { error: 'Parámetros inválidos para mensajería' }

      return
    }

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en messaging middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD MESSAGING ====================='
  )
  await next()
}
