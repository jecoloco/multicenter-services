import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerStatusClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async getCustomerStatus(
    token: string,
    amount: number,
    document: string
  ): Promise<any> {
    return this.http.post(
      '/MulticardApi/api/OneTimePass/GetCustomerByDoc',
      {
        amount,
        document,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
