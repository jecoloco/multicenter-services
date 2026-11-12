export async function worldSlider(ctx: Context, next: () => Promise<any>) {
  try {
    const data = await ctx.clients.worldSliderClient.getItems()

    ctx.status = 200
    ctx.set('Cache-Control', 'public, max-age=300')
    ctx.body = data ?? []
  } catch (err: any) {
    console.error('Error al consultar WorldSlider:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: 'No se pudieron obtener los ítems del slider',
    }
  }

  await next()
}
