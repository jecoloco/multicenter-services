import { json } from 'co-body'

const requiredFields = [
  'nombres',
  'apellidos',
  'ci',
  'nacimiento',
  'genero',
  'estadocivil',
  'email',
  'telefono',
  'ciudad',
  'direccion',
  'vivienda',
]

export async function multicardRequest(ctx: Context, next: () => Promise<any>) {
  try {
    const body = await json(ctx.req)

    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      requiredFields.some(
        (field) => typeof body[field] !== 'string' || !body[field].trim()
      )
    ) {
      ctx.status = 400
      ctx.body = {
        error: 'Se requieren todos los campos del formulario Multicard',
      }

      return
    }

    const response = await ctx.clients.multicardRequestClient.createRequest(
      body
    )

    ctx.status = 201
    ctx.body = { DocumentId: response.DocumentId }
  } catch (err: any) {
    console.error('Error al crear solicitud Multicard:', err)
    ctx.status = err.response?.status ?? 500
    ctx.body = err.response?.data ?? { error: 'No se pudo crear la solicitud' }
  }

  await next()
}
