import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class AuthenticateClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async authenticate(): Promise<any> {
    return this.http.post(
      '/MulticardApi/api/Account/Authenticate',
      {
        username: 'wabi',
        password: 'LuB5IorfswbAi==',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
