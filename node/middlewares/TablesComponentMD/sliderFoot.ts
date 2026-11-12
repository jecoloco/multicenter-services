export async function sliderFoot(ctx: Context, next: () => Promise<any>) {
  try {
    const data = await ctx.clients.sliderFootClient.getItems()

    ctx.status = 200
    ctx.set('Cache-Control', 'public, max-age=300')
    ctx.body = data ?? []
  } catch (err: any) {
    console.error('Error al consultar SliderFoot:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: 'No se pudieron obtener los ítems del slider',
    }
  }

  await next()
}
