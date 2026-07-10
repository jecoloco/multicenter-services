import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CustomerOtpClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://3iblkla70c.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async sendOtp(customerId: string): Promise<any> {
    const url = `/prod/api/v1/multipoint/customer/otp/${customerId}`

    // 👇 Logueamos la URL completa manualmente
    console.log(
      'Llamando a OTP con URL completa (GET):',
      `https://3iblkla70c.execute-api.us-east-1.amazonaws.com${url}`
    )

    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
