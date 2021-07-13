import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'

const CSS_HANDLES = [
  'newsletter',
  'newsletterTitle',
  'newsletterSubTitle',
  'buttonName',
]
const Newsletter = () => {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={`${handles.newsletter}`}>
      <div className={`${handles.newsletterTitle}`}>NEWSLETTER</div>
      <div className={`${handles.newsletterSubTitle}`}>
        cadastre-se e receba nossas novidades{' '}
        <div className={`${handles.buttonName}`}>
          <Button />
        </div>
      </div>
    </div>
  )
}

export default Newsletter
