import { json } from 'co-body'

export async function paymentPreview(ctx: Context, next: () => Promise<any>) {
  console.log(
    '============= INICIO REQUEST PAYMENT PREVIEW ===================='
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

    console.log('Token extraído:', `${token.substring(0, 20)}...`) // 👀 log parcial

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

    // Paso 2: llamar al servicio OTP con el customerId
    const otpResponse = await ctx.clients.customerOtpClient.sendOtp(customerId)

    console.log('Respuesta de OTP:', otpResponse)

    ctx.status = 200
    ctx.body = {
      ...(otpResponse && typeof otpResponse === 'object' ? otpResponse : {}),
      message: customerId,
    }
  } catch (err: any) {
    console.error('Error en paymentPreview middleware:', err)
    console.error('Config de la petición fallida:', err.config) // 👀 log de la config Axios
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  console.log(
    '============== FIN REQUEST PAYMENT PREVIEW ======================'
  )
  await next()
}
