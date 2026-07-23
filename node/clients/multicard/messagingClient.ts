import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class MessagingClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async sendOtp(token: string, phone: string): Promise<any> {
    return this.http.post(
      '/Messaging/api/Message/SendCodeOTP',
      { phone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  public async validateOtp(
    token: string,
    code: string,
    phone: string
  ): Promise<any> {
    return this.http.post(
      '/Messaging/api/Message/ValidateOTP',
      { code, phone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
