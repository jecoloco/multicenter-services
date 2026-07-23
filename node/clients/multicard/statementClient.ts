import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class StatementClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://apipromatrix.multicenter.com.bo', context, options)
  }

  public async getStatementByDoc(
    token: string,
    documentNumber: string
  ): Promise<any> {
    return this.http.get(
      `/MulticardApi/api/Multicard/GetStatementByDoc/${encodeURIComponent(
        documentNumber
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
