import { MasterData } from '@vtex/api'

import type { INewsletter } from '../../typings/newsletter'

export default class NewsletterForm extends MasterData {
  public async get(id: string): Promise<any> {
    const resp = await this.getDocument({
      dataEntity: 'newsletter',
      fields: ['_all'],
      id,
    })

    return resp
  }

  public async getByDocument(email: string): Promise<any> {
    const resp = await this.searchDocuments({
      dataEntity: 'newsletter',
      fields: ['_all'],
      where: email,
      pagination: {
        page: 1,
        pageSize: 1,
      },
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

export function getByEmail(email: string): void {
  // const campoEmail: HTMLInputElement =
  //   document.getElementById('campoEmail') ?? null
  // const campoEmail = (document.getElementById('campoEmail') as HTMLInputElement)
  //   .value

  // const valueEmail: any = campoEmail

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vtex.ds.v10+json',
      'REST-Range': 'resources%3D0-10',
    },
  }

  const url = `/api/dataentities/CL/search?_where=email=${email}`

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(`error:${err}`))
}
