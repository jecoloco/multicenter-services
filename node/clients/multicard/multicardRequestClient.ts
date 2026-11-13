import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const VTEX_APP_KEY = 'vtexappkey-multicenter-DZFRCZ'
const VTEX_APP_TOKEN =
  'BHDSQDESJPINJDZYGBEWEGTEXKGZPKZDSTTLCCVXVADROWTYPVBCZFYVZIAHIDRZEQXOOHDCDBZBZPCLYVTEBJTDPNXKVHVOHZROYMBVACTCSSYQQLESSSCSGWXLLIUY'

export default class MulticardRequestClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://multicenter.vtexcommercestable.com.br', context, options)
  }

  public async createRequest(fields: Record<string, string>): Promise<any> {
    return this.http.post('/api/dataentities/MR/documents', fields, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VTEX-API-AppKey': VTEX_APP_KEY,
        'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
      },
    })
  }
}
