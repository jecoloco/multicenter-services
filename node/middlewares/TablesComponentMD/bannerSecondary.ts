export async function bannerSecondary(ctx: Context, next: () => Promise<any>) {
  try {
    const data = await ctx.clients.bannerSecondaryClient.getBanners()

    ctx.status = 200
    ctx.set('Cache-Control', 'public, max-age=300')
    ctx.body = data ?? []
  } catch (err: any) {
    console.error('Error al consultar BannerSecondary:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: 'No se pudieron obtener los banners',
    }
  }

  await next()
}
