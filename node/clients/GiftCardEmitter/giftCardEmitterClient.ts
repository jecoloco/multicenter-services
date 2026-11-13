import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const VTEX_APP_KEY = 'vtexappkey-multicenter-DZFRCZ'
const VTEX_APP_TOKEN =
  'BHDSQDESJPINJDZYGBEWEGTEXKGZPKZDSTTLCCVXVADROWTYPVBCZFYVZIAHIDRZEQXOOHDCDBZBZPCLYVTEBJTDPNXKVHVOHZROYMBVACTCSSYQQLESSSCSGWXLLIUY'

type DataEntity = 'CL' | 'CG' | 'LG' | 'GA'

export default class GiftCardEmitterClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://multicenter.vtexcommercestable.com.br', context, options)
  }

  private get headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VTEX-API-AppKey': VTEX_APP_KEY,
      'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
    }
  }

  private search(entity: DataEntity, params: Record<string, string>) {
    return this.http.get<any[]>(`/api/dataentities/${entity}/search`, {
      params,
      headers: this.headers,
    })
  }

  public getCustomer(email: string) {
    return this.search('CL', {
      _fields: 'userId,email',
      _where: `email=${email}`,
    })
  }

  public getCampaigns(includeVoucherFields = false) {
    return this.search(
      'CG',
      includeVoucherFields
        ? {
            _fields:
              'idCampana,nombre,tipo,activa,fechaInicio,fechaFin,giftcardExpirationDate,montoBOB',
          }
        : {
            _fields: 'idCampana,tipo,activa,fechaInicio,fechaFin',
          }
    )
  }

  public getCampaign(idCampana: string) {
    return this.search('CG', {
      _fields:
        'idCampana,nombre,tipo,activa,montoBOB,fechaInicio,fechaFin,giftcardExpirationDate,diasExpiracion',
      _where: `idCampana="${idCampana}"`,
    })
  }

  public getRegistration(
    email: string,
    fields: string,
    idCampana?: string,
    useWhere = false
  ) {
    const params: Record<string, string> = { _fields: fields }

    if (useWhere && idCampana) {
      params._where = `email=${email} AND idCampana=${idCampana}`
    } else {
      params.email = email
      params._pageSize = '200'
    }

    return this.search('LG', params)
  }

  public getToken(token: string) {
    return this.search('GA', {
      _fields: 'token,estado,id,campanaId',
      _where: `token=${token}`,
    })
  }

  public createCustomer(payload: Record<string, unknown>) {
    return this.http.post('/api/dataentities/CL/documents', payload, {
      headers: this.headers,
    })
  }

  public createRegistration(payload: Record<string, unknown>) {
    return this.http.post('/api/dataentities/LG/documents', payload, {
      headers: this.headers,
    })
  }

  public updateRegistration(
    documentId: string,
    payload: Record<string, unknown>
  ) {
    return this.http.put(
      `/api/dataentities/LG/documents/${encodeURIComponent(documentId)}`,
      payload,
      { headers: this.headers }
    )
  }

  public updateToken(documentId: string, payload: Record<string, unknown>) {
    return this.http.patch(
      `/api/dataentities/GA/documents/${encodeURIComponent(documentId)}`,
      payload,
      { headers: this.headers }
    )
  }

  public createGiftCard(payload: Record<string, unknown>) {
    return this.http.post('/api/giftcards', payload, {
      headers: this.headers,
    })
  }

  public creditGiftCard(cardId: string, payload: Record<string, unknown>) {
    return this.http.post(
      `/api/gift-card-system/pvt/giftCards/${encodeURIComponent(
        cardId
      )}/credit`,
      payload,
      { headers: this.headers }
    )
  }

  public getOrders(email: string) {
    return this.http.get('/api/oms/pvt/orders', {
      params: {
        q: email,
        per_page: 50,
        page: 1,
      },
      headers: this.headers,
    })
  }

  public sendInstitutionalEmail(to: string, codigoRedencion: string) {
    return this.http.post(
      '/api/mail-service/pvt/sendMail',
      {
        templateName: 'tu-voucher',
        jsonData: { to, codigoRedencion },
      },
      { headers: this.headers }
    )
  }
}
