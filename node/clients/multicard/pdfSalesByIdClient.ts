import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PdfSalesByIdClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apitest.multicentercorp.com', context, options)
  }

  public async getPdfSalesById(
    token: string,
    saleId: string | number
  ): Promise<any> {
    return this.http.get(
      `/MulticardApi/api/Multicard/GetPdfSalesMulticardById/${encodeURIComponent(
        String(saleId)
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
