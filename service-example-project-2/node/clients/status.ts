import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Status extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://httpstat.us', context, options)
  }

  public async getStatus(email: string): Promise<string> {
    return this.http.get(email.toString(), {
      metric: 'status-get',
    })
  }

  public async getStatusWithHeaders(
    email: string
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(email.toString(), {
      metric: 'status-get-raw',
    })
  }
}
