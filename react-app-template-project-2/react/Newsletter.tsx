/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-use-before-define */
import React, {  useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Input, Button } from 'vtex.styleguide'
import axios from 'axios'

import { INewsletter } from '../../service-example-project-2/typings/newsletter'

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
  const [email, setEmail] = useState<INewsletter>()

  const handleSendEmail = () => {
    console.log({email});

    axios.post('/_v/createuser',{ email })
    .then((response) => {
      setEmail(response.data.email)
    })
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
          <Input placeholder="Nome: " />
        </div>
        <div className={`${handles.placeholderEmail}`}>
          <Input value={email} onChange={(event: any) => setEmail(event.target.value)} placeholder="Email: " />
        </div>
        <div className={`${handles.buttonContent}`}>
          <Button variation="primary" size="regular" onClick={()=>handleSendEmail()}>
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
