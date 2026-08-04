import { json } from 'co-body'

export async function otpSend(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD OTP SEND ===================='
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
    const { token, phone, email, message } = body

    if (!token || !phone) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros token o phone' }

      return
    }

    const response = await ctx.clients.multicardMessagingClient.sendOtp({
      token,
      phone,
      email,
      message,
    })

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en otpSend middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD OTP SEND ====================='
  )
  await next()
}
