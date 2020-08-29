import React from 'react'
import { APP_URL } from '../../setup/config/env'
import { H1, H3 } from '../../ui/typography'

const SurveyChoices = ({ choices, handleChange, choiceCategory }) => {
  const choiceBoxes = category => {
    return choices.map( (choice, index) => {
      return (
        <span
          key={index}
          name={category}
          data-category={category}
          data-value={choice.style}
          onClick={event => handleChange(event)}
          role='checkbox'
          aria-checked={false}
        >
          {/* <input type='checkbox' */}
          {/*   value={`${choice.style}`} */}
          {/*   style={{ */}
          {/*     display: 'none' */}
          {/*   }} */}
          {/*   selected={false} */}
          {/* /> */}
          <img style={{
            height: '200px',
            width: '150px',
            display: 'inline'
          }}
            src={`${ APP_URL }/images/surveyImages/${category}/${choice.image}`}
          />
        </span>
    )
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        overflowX: 'scroll'
      }}>
      {choiceBoxes(choiceCategory)}
    </div>
)
}

export default SurveyChoices
