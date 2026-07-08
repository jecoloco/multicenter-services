import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://sotbo6ympg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async createCustomer(body: any): Promise<any> {
    return this.http.post('/dev/api/v1/multipoint/customer', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
