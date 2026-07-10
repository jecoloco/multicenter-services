import { json } from 'co-body'

export async function paymentPreviewUpdateCustomer(
  ctx: Context,
  next: () => Promise<any>
) {
  console.log(
    '============= INICIO REQUEST PAYMENT PREVIEW + UPDATE CUSTOMER ===================='
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

    const authHeader = ctx.get('authorization')

    console.log('Authorization header recibido:', authHeader)

    if (!authHeader) {
      ctx.status = 401
      ctx.body = { error: 'Falta el header Authorization con Bearer token' }

      return
    }

    const token = authHeader.replace('Bearer ', '')

    console.log('Token extraído:', `${token.substring(0, 20)}...`)

    // Paso 1: llamar a payment preview
    const previewResponse = await ctx.clients.paymentPreviewClient.getPreview(
      body,
      token
    )

    console.log('Respuesta de payment preview:', previewResponse)

    if (!previewResponse?.data?.customerId) {
      ctx.status = 400
      ctx.body = {
        error: 'No se pudo obtener customerId del servicio payment preview',
      }

      return
    }

    const { customerId } = previewResponse.data

    console.log('CustomerId obtenido:', customerId)

    // Paso 2: llamar al servicio PATCH Customer
    const updateBody = {
      phone: body.phone,
      email: body.email,
    }

    console.log('Body para actualizar cliente:', updateBody)

    const updateResponse = await ctx.clients.customerUpdateClient.updateCustomer(
      customerId,
      updateBody
    )

    console.log('Respuesta de Customer Update:', updateResponse)

    ctx.status = 200
    ctx.body = updateResponse
  } catch (err: any) {
    console.error('Error en paymentPreviewUpdateCustomer middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST PAYMENT PREVIEW + UPDATE CUSTOMER ======================'
  )
  await next()
}
