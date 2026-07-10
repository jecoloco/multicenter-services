import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerUpdateClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async updateCustomer(customerId: string, body: any): Promise<any> {
    const url = `/prod/api/v1/multipoint/customer/${customerId}`

    console.log(
      'Llamando a Customer Update con URL completa (PATCH):',
      `https://3iblkla70c.execute-api.us-east-1.amazonaws.com${url}`
    )

    return this.http.patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
