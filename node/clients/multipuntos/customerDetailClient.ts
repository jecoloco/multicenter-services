import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerDetailClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://sotbo6ympg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async getCustomer(customerId: string): Promise<any> {
    const url = `/dev/api/v1/multipoint/customer/${customerId}`

    console.log(
      'Llamando a Customer Detail con URL completa (GET):',
      `https://sotbo6ympg.execute-api.us-east-1.amazonaws.com${url}`
    )

    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
