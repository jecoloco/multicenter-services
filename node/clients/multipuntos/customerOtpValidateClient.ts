import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerOtpValidateClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async validateOtp(body: any): Promise<any> {
    const url = '/prod/api/v1/multipoint/customer/otp/validate'

    return this.http.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
