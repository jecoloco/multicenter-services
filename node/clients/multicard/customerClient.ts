import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async getCustomerByDoc(
    token: string,
    documentNumber: string
  ): Promise<any> {
    return this.http.get(
      `/MulticardApi/api/Multicard/GetCustomerByDoc/${encodeURIComponent(
        documentNumber
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
