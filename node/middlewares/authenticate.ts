import { json } from 'co-body'

export async function authenticate(ctx: Context, next: () => Promise<any>) {
  console.log("CTX VTEX")
  console.log("===== VTEX AUTH =====")
  console.log({
    authToken: !!ctx.vtex?.authToken,
    storeUserAuthToken: !!ctx.vtex?.storeUserAuthToken,
    adminUserAuthToken: !!ctx.vtex?.adminUserAuthToken,
    account: ctx.vtex?.account,
    workspace: ctx.vtex?.workspace,
  })

  // 🚨 Nueva validación: si no hay adminUserAuthToken, bloqueamos
  if (!ctx.vtex?.adminUserAuthToken) {
    ctx.status = 403
    ctx.body = { error: 'Acceso no autorizado' }
    return
  }

  const body = await json(ctx.req)
  const { amount, document } = body

  if (typeof amount !== 'number' || !document || typeof document !== 'string') {
    ctx.status = 400
    ctx.body = { error: 'amount y document son obligatorios' }
    return
  }

  try {
    const auth = await ctx.clients.authClient.authenticate()
    const token = auth.message

    const customer = await ctx.clients.authClient.getCustomerByDoc(
      token,
      amount,
      document
    )

    ctx.status = 200
    ctx.body = customer
  } catch (err: any) {
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: err.message }
  }

  await next()
}
