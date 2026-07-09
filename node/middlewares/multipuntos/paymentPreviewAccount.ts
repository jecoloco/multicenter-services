import { json } from 'co-body'

export async function paymentPreviewAccount(
  ctx: Context,
  next: () => Promise<any>
) {
  console.log(
    '============= INICIO REQUEST PAYMENT PREVIEW + ACCOUNT ===================='
  )

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

    if (!previewResponse?.data?.accountId) {
      ctx.status = 400
      ctx.body = {
        error: 'No se pudo obtener accountId del servicio payment preview',
      }

      return
    }

    const { accountId } = previewResponse.data

    console.log('AccountId obtenido:', accountId)

    // Paso 2: llamar al servicio Account GET
    const accountResponse = await ctx.clients.customerAccountClient.getAccount(
      accountId
    )

    console.log('Respuesta de Customer Account:', accountResponse)

    ctx.status = 200
    ctx.body = accountResponse
  } catch (err: any) {
    console.error('Error en paymentPreviewAccount middleware:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST PAYMENT PREVIEW + ACCOUNT ======================'
  )
  await next()
}
