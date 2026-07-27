export async function pdfSalesById(ctx: Context, next: () => Promise<any>) {
  console.log('=== INICIO REQUEST MULTICARD PDF SALES BY ID ===')

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
    const authorizationHeader = ctx.get('authorization') || ''
    const token = authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.slice(7)
      : ''

    const rawSaleId = ctx.query?.saleId ?? ctx.query?.id
    const saleId = Array.isArray(rawSaleId) ? rawSaleId[0] : rawSaleId

    if (!token) {
      ctx.status = 400
      ctx.body = { error: 'Falta parámetro token' }

      return
    }

    if (!saleId) {
      ctx.status = 400
      ctx.body = { error: 'Falta parámetro saleId' }

      return
    }

    const response = await ctx.clients.pdfSalesByIdClient.getPdfSalesById(
      token,
      saleId
    )

    ctx.status = 200
    ctx.body = response
  } catch (err: any) {
    console.error('Error en pdfSalesById middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log('=== FIN REQUEST MULTICARD PDF SALES BY ID ===')
  await next()
}
