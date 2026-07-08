import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class AuthTokenClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://sotbo6ympg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async getAuthToken(): Promise<any> {
    const body =
      'grant_type=client_credentials' +
      '&client_id=dh3l78avoqjtvevdd56nos8ma' +
      '&client_secret=tovg8c6rdce3lm13inj7gjifr9gg43uoqqlfnbksp0vpqpon45h' +
      '&scope=https://api.dev.multicenter.com/vtex'

    return this.http.post('/dev/api/v1/core/users/auth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}
