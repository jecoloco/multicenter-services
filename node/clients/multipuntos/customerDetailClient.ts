import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerDetailClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async getCustomer(customerId: string): Promise<any> {
    const url = `/prod/api/v1/multipoint/customer/${customerId}`

    console.log(
      'Llamando a Customer Detail con URL completa (GET):',
      `https://3iblkla70c.execute-api.us-east-1.amazonaws.com${url}`
    )

    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
