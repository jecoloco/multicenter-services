import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

interface AuthenticateResponse {
  success: boolean
  message: string
}

export default class AuthClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async authenticate(): Promise<AuthenticateResponse> {
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

  public async getCustomerByDoc(
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