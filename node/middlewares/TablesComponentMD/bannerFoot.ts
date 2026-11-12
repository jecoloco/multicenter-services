export async function bannerFoot(ctx: Context, next: () => Promise<any>) {
  try {
    const data = await ctx.clients.bannerFootClient.getBanners()

    const banners = (data ?? [])
      .filter((item: any) => item.activo === true)
      .filter((item: any) => item.image && item.link)
      .sort(
        (a: any, b: any) =>
          parseInt(a.position ?? '999', 10) - parseInt(b.position ?? '999', 10)
      )

    ctx.status = 200
    ctx.set('Cache-Control', 'public, max-age=300')
    ctx.body = banners
  } catch (err: any) {
    console.error('Error al consultar BannerFoot:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? {
      error: 'No se pudieron obtener los banners',
    }
  }

  await next()
}
