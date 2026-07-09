// clients/multipuntos/paymentPreviewClient.ts
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PaymentPreviewClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://sotbo6ympg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public async getPreview(body: any, token: string): Promise<any> {
    return this.http.post(
      '/dev/api/v1/multipoint/transaction/payment/preview',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 👈 token dinámico
        },
      }
    )
  }
}
