import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PointValueClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com', // 👈 prod base URL
      context,
      options
    )
  }

  public async getPointValue(): Promise<any> {
    return this.http.get('/prod/api/v1/multipoint/transaction/pointvalue', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
