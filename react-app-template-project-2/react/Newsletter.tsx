/* eslint-disable no-use-before-define */
import React from 'react'
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
          <Input placeholder="Email: " />
        </div>
        <div className={`${handles.buttonContent}`}>
          <Button variation="primary" size="regular">
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
