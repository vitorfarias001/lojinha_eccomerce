/* eslint-disable @typescript-eslint/no-explicit-any */
import { MasterData } from '@vtex/api'

import type { INewsletter } from '../../typings/newsletter'

export default class Newsletter extends MasterData {
  public async get(id: string): Promise<any> {
    const resp = await this.getDocument({
      dataEntity: 'newsletter',
      fields: ['_all'],
      id,
    })

    return resp
  }

  public async create(userCreate: INewsletter) {
    const resp = await this.createDocument({
      dataEntity: 'newsletter',
      schema: 'vitor',
      fields: userCreate,
    })

    return resp
  }

  public async getAll() {
    const resp = await this.searchDocumentsWithPaginationInfo({
      dataEntity: 'newsletter',
      schema: 'vitor',
      fields: ['_all'],
      pagination: {
        page: 1,
        pageSize: 800,
      },
    })
    // eslint-disable-next-line padding-line-between-statements
    return resp
  }
}
