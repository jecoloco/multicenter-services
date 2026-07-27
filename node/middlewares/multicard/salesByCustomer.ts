export async function salesByCustomer(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST MULTICARD SALES BY CUSTOMER ===================='
  )

  //   const origin = ctx.get('origin') || ''
  //   const referer = ctx.get('referer') || ''

  //   const allowedOrigins = [
  //     'https://simon--multicenter.myvtex.com',
  //     'https://multicenter.myvtex.com',
  //     'https://www.multicenter.com',
  //   ]

  //   const isAllowed = allowedOrigins.some(
  //     (o) => origin.startsWith(o) || referer.startsWith(o)
  //   )

  //   if (!isAllowed) {
  //     ctx.status = 403
  //     ctx.body = { error: 'Acceso no autorizado' }

  //     return
  //   }

  try {
    const authorizationHeader = ctx.get('authorization') || ''
    const rawToken = ctx.query?.token
    const tokenValue = Array.isArray(rawToken) ? rawToken[0] : rawToken
    const tokenFromHeader = authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.slice(7)
      : ''

    const token =
      tokenValue || ctx.get('x-vtex-api-apptoken') || tokenFromHeader

    const rawCustomerId = ctx.query?.customerId ?? ctx.query?.customerid
    const customerId = Array.isArray(rawCustomerId)
      ? rawCustomerId[0]
      : rawCustomerId

    const rawPage = ctx.query?.page
    const page = Number(Array.isArray(rawPage) ? rawPage[0] : rawPage || 0)

    if (!token) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros token' }

      return
    }

    if (!customerId) {
      ctx.status = 400
      ctx.body = { error: 'Faltan parámetros customerId' }

      return
    }

    const response = await ctx.clients.multicardSalesByCustomerClient.getSalesMulticardByCustomer(
      token,
      customerId,
      page
    )

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en salesByCustomer middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST MULTICARD SALES BY CUSTOMER ====================='
  )
  await next()
}
