import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class SalesByCustomerClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async getSalesMulticardByCustomer(
    token: string,
    customerId: string | number,
    page = 0
  ): Promise<any> {
    return this.http.get(
      `/MulticardApi/api/Multicard/GetSalesMulticardByCustomer/${encodeURIComponent(
        String(customerId)
      )}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
