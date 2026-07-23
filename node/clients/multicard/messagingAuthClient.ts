import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class MessagingAuthClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async authenticate(): Promise<any> {
    return this.http.post(
      '/Messaging/api/Account/Authenticate',
      {
        username: 'wabi',
        password: '8yMDA1LzA1L2lkZW50==',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
