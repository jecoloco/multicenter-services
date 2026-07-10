import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class AuthTokenClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async getAuthToken(): Promise<any> {
    const body =
      'grant_type=client_credentials' +
      '&client_id=37kgta0gp0a7d7de02r3991pji' +
      '&client_secret=uacugv155isev4rmcodkc4br8ks9oo6j6bpv585phfj55c8jp58' +
      '&scope=https://api.multicenter.com/vtex'

    return this.http.post('/prod/api/v1/core/users/auth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}
