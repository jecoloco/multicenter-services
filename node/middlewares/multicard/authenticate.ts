export async function authenticate(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD AUTHENTICATE ===================='
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
    const response = await ctx.clients.multicardAuthenticateClient.authenticate()

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en authenticate middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD AUTHENTICATE ====================='
  )
  await next()
}
