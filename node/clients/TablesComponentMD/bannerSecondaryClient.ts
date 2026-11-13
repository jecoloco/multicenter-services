import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const VTEX_APP_KEY = 'vtexappkey-multicenter-DZFRCZ'
const VTEX_APP_TOKEN =
  'BHDSQDESJPINJDZYGBEWEGTEXKGZPKZDSTTLCCVXVADROWTYPVBCZFYVZIAHIDRZEQXOOHDCDBZBZPCLYVTEBJTDPNXKVHVOHZROYMBVACTCSSYQQLESSSCSGWXLLIUY'

export default class BannerSecondaryClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://multicenter.vtexcommercestable.com.br', context, options)
  }

  public async getBanners(): Promise<any[]> {
    return this.http.get('/api/dataentities/BN/search', {
      params: {
        _fields: 'image,link,name,startDateTime,endDateTime,nuevaPestana',
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'REST-Range': 'resources=0-99',
        'X-VTEX-API-AppKey': VTEX_APP_KEY,
        'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
      },
    })
  }
}
