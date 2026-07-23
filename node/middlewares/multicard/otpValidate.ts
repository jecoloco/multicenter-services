import { json } from 'co-body'

export async function otpValidate(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD OTP VALIDATE ===================='
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
    const { token } = body
    const { code } = body
    const { phone } = body

    if (!token || !code || !phone) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros token, code o phone' }

      return
    }

    const response = await ctx.clients.multicardMessagingClient.validateOtp(
      token,
      code,
      phone
    )

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en otpValidate middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD OTP VALIDATE ====================='
  )
  await next()
}
