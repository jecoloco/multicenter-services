import { json } from 'co-body'

export async function authenticate(ctx: Context, next: () => Promise<any>) {
  console.log('============================================================')
  console.log('============= INICIO REQUEST AUTHENTICATE ===================')
  console.log('============================================================')

  console.log('\n===== REQUEST =====')
  console.log({
    method: ctx.method,
    url: ctx.url,
    originalUrl: ctx.originalUrl,
    path: ctx.path,
    query: ctx.query,
    protocol: ctx.protocol,
    host: ctx.host,
    hostname: ctx.hostname,
    origin: ctx.origin,
    ip: ctx.ip,
    ips: ctx.ips,
    secure: ctx.secure,
  })

  console.log('\n===== HEADERS =====')
  console.log(JSON.stringify(ctx.headers, null, 2))

  console.log('\n===== VTEX CONTEXT =====')
  console.log(
    JSON.stringify(
      {
        authToken: !!ctx.vtex?.authToken,
        storeUserAuthToken: !!ctx.vtex?.storeUserAuthToken,
        adminUserAuthToken: !!ctx.vtex?.adminUserAuthToken,
        account: ctx.vtex?.account,
        workspace: ctx.vtex?.workspace,
        route: ctx.vtex?.route,
        logger: ctx.vtex?.logger ? 'Disponible' : 'No disponible',
      },
      null,
      2
    )
  )

  console.log('\n===== REQUEST ORIGIN =====')
  console.table({
    origin: ctx.get('origin'),
    referer: ctx.get('referer'),
    userAgent: ctx.get('user-agent'),
    forwardedFor: ctx.get('x-forwarded-for'),
    realIp: ctx.get('x-real-ip'),
    requestId: ctx.get('x-request-id'),
    forwardedProto: ctx.get('x-forwarded-proto'),
    forwardedHost: ctx.get('x-forwarded-host'),
    forwardedPort: ctx.get('x-forwarded-port'),
  })

  // 🚨 Nueva validación: si no hay adminUserAuthToken, bloqueamos
  if (!ctx.vtex?.adminUserAuthToken) {
    console.log('\n===== RESULTADO =====')
    console.log('❌ Acceso denegado: adminUserAuthToken no presente.')

    ctx.status = 403
    ctx.body = {
      error: 'Acceso no autorizado',
    }

    console.log('============================================================')
    console.log('============== FIN REQUEST AUTHENTICATE ====================')
    console.log('============================================================')

    return
  }

  const body = await json(ctx.req)

  console.log('\n===== BODY =====')
  console.log(JSON.stringify(body, null, 2))

  const { amount, document } = body

  if (typeof amount !== 'number' || !document || typeof document !== 'string') {
    console.log('\n===== RESULTADO =====')
    console.log('❌ Body inválido.')

    ctx.status = 400
    ctx.body = {
      error: 'amount y document son obligatorios',
    }

    console.log('============================================================')
    console.log('============== FIN REQUEST AUTHENTICATE ====================')
    console.log('============================================================')

    return
  }

  try {
    console.log('\n===== AUTENTICANDO CONTRA PROMATRIX =====')

    const auth = await ctx.clients.authClient.authenticate()
    const token = auth.message

    console.log('✅ Token obtenido correctamente.')

    console.log('\n===== CONSULTANDO CLIENTE =====')
    console.log({
      amount,
      document,
    })

    const customer = await ctx.clients.authClient.getCustomerByDoc(
      token,
      amount,
      document
    )

    console.log('\n===== RESPUESTA PROMATRIX =====')
    console.log(JSON.stringify(customer, null, 2))

    ctx.status = 200
    ctx.body = customer
  } catch (err: any) {
    console.log('\n===== ERROR =====')

    console.error({
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
      stack: err.stack,
    })

    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: err.message,
    }
  }

  console.log('\n===== RESPONSE =====.')
  console.log({
    status: ctx.status,
    body: ctx.body,
  })

  console.log('============================================================')
  console.log('============== FIN REQUEST AUTHENTICATE ====================')
  console.log('============================================================')

  await next()
}
