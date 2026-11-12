import { json } from 'co-body'

const requiredString = <Key extends string>(
  body: Record<string, unknown>,
  key: Key
): body is Record<string, unknown> & Record<Key, string> =>
  typeof body[key] === 'string' && body[key].trim().length > 0

const isObject = (value: any): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value)

export async function giftCardEmitter(ctx: Context, next: () => Promise<any>) {
  try {
    const body = await json(ctx.req)

    if (!isObject(body) || typeof body.action !== 'string') {
      ctx.status = 400
      ctx.body = { error: 'Se requiere una acción válida' }

      return
    }

    const client = ctx.clients.giftCardEmitterClient
    let response: any
    let validRequest = false

    switch (body.action) {
      case 'customerLookup':
        if (!requiredString(body, 'email')) break
        validRequest = true
        response = await client.getCustomer(body.email.trim().toLowerCase())
        break

      case 'campaignsActive':
        validRequest = true
        response = await client.getCampaigns()
        break

      case 'campaignsList':
        validRequest = true
        response = await client.getCampaigns(true)
        break

      case 'campaignLookup':
        if (!requiredString(body, 'idCampana')) break
        validRequest = true
        response = await client.getCampaign(body.idCampana.trim())
        break

      case 'registrationLookup':
        if (
          !requiredString(body, 'email') ||
          !requiredString(body, 'idCampana')
        ) {
          break
        }

        validRequest = true
        response = await client.getRegistration(
          body.email.trim().toLowerCase(),
          'email,idCampana',
          body.idCampana.trim(),
          true
        )
        break

      case 'registrationByEmail':
        if (!requiredString(body, 'email')) break
        validRequest = true
        response = await client.getRegistration(
          body.email.trim().toLowerCase(),
          'id,email,idCampana,codigoRedencion,estado'
        )
        break

      case 'pendingRegistrationByEmail':
        if (!requiredString(body, 'email')) break
        validRequest = true
        response = await client.getRegistration(
          body.email.trim().toLowerCase(),
          'email,codigoRedencion,idCampana,nombreCampana,estado,fechaEmision,expiringDate'
        )
        break

      case 'registrationUpdateLookup':
        if (!requiredString(body, 'email')) break
        validRequest = true
        response = await client.getRegistration(
          body.email.trim().toLowerCase(),
          'id,email,idCampana'
        )
        break

      case 'tokenLookup':
        if (!requiredString(body, 'token')) break
        validRequest = true
        response = await client.getToken(body.token.trim())
        break

      case 'customerCreate':
        if (!isObject(body.payload)) break
        validRequest = true
        response = await client.createCustomer(body.payload)
        break

      case 'registrationCreate':
        if (!isObject(body.payload)) break
        validRequest = true
        response = await client.createRegistration(body.payload)
        break

      case 'registrationUpdate':
        if (!requiredString(body, 'documentId') || !isObject(body.payload)) {
          break
        }

        validRequest = true
        response = await client.updateRegistration(
          body.documentId.trim(),
          body.payload
        )
        break

      case 'tokenUpdate':
        if (!requiredString(body, 'documentId') || !isObject(body.payload)) {
          break
        }

        validRequest = true
        response = await client.updateToken(
          body.documentId.trim(),
          body.payload
        )
        break

      case 'giftCardCreate':
        if (!isObject(body.payload)) break
        validRequest = true
        response = await client.createGiftCard(body.payload)
        break

      case 'giftCardCredit':
        if (!requiredString(body, 'cardId') || !isObject(body.payload)) break
        validRequest = true
        response = await client.creditGiftCard(body.cardId.trim(), body.payload)
        break

      case 'ordersLookup':
        if (!requiredString(body, 'email')) break
        validRequest = true
        response = await client.getOrders(body.email.trim().toLowerCase())
        break

      case 'emailSend':
        if (
          !requiredString(body, 'email') ||
          !requiredString(body, 'codigoRedencion')
        ) {
          break
        }

        validRequest = true
        response = await client.sendInstitutionalEmail(
          body.email.trim().toLowerCase(),
          body.codigoRedencion
        )
        break

      default:
        ctx.status = 400
        ctx.body = { error: 'Acción de GiftCardEmitter no permitida' }

        return
    }

    if (!validRequest) {
      ctx.status = 400
      ctx.body = { error: 'Faltan datos requeridos para la acción' }

      return
    }

    ctx.status = 200
    ctx.set('Cache-Control', 'no-store')
    ctx.body = response
  } catch (err: any) {
    console.error('Error en middleware GiftCardEmitter:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: 'No se pudo completar la operación de GiftCardEmitter',
    }
  }

  await next()
}
