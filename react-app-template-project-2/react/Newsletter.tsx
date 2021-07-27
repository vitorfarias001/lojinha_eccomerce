import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Input, Button } from 'vtex.styleguide'

const CSS_HANDLES = [
  'newsletterContainer',
  'newsletter',
  'newsletterTitle',
  'newsletterSubTitle',
  'buttonName',
  'placeholderContainer',
  'placeholderName',
  'placeholderEmail',
  'buttonContent',
]

const Newsletter = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [email, setEmail] = useState()

  const getByEmail = (valueEmail: string) => {
    // const campoEmail: HTMLInputElement =
    //   document.getElementById('campoEmail') ?? null
    // const campoEmail = (document.getElementById('campoEmail') as HTMLInputElement)
    //   .value

    // const valueEmail: any = campoEmail
    const valueName = (document.getElementById('campoNome') as HTMLInputElement)
      .value

    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: valueEmail,
        name: valueName,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vtex.ds.v10+json',
        'REST-Range': 'resources%3D0-10',
      },
    }

    const url = '/_v/createuser'
    // const url = `/api/dataentities/CL/search?_where=email=${valueEmail}`

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.info(json))
      .catch((err) => console.error(`error:${err}`))
  }

  const handleSendEmail = () => {
    const campoEmail = (document.getElementById(
      'campoEmail'
    ) as HTMLInputElement).value

    getByEmail(campoEmail)
  }

  return (
    <div className={`${handles.newsletterContainer}`}>
      <div className={`${handles.newsletter}`}>
        <div className={`${handles.newsletterTitle}`}>NEWSLETTER</div>
        <div className={`${handles.newsletterSubTitle}`}>
          cadastre-se e receba nossas novidades{' '}
        </div>
      </div>
      <div className={`${handles.placeholderContainer}`}>
        <div className={`${handles.placeholderName}`}>
          <Input id="campoNome" placeholder="Nome: " />
        </div>
        <div className={`${handles.placeholderEmail}`}>
          <Input
            id="campoEmail"
            value={email}
            onChange={(event: any) => setEmail(event.target.value)}
            placeholder="Email: "
          />
        </div>
        <div className={`${handles.buttonContent}`}>
          <Button
            variation="primary"
            size="regular"
            onClick={() => handleSendEmail()}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
