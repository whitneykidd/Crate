import React from 'react'
import { APP_URL } from '../../setup/config/env'

const SurveyChoices = ({ choices, handleChange, category }) => {
  const choiceBoxes = choices.map( (choice, index) => {
    return (
      <div key={index}>
        <input type='checkbox'
          value={`${choice.style}`}
          name={category}
          isChecked={false}
          onChange={(event) => handleChange(event)}
      />
      <img style={{
          height: '200px',
          width: '150px',
          display: 'inline'
        }}
        src={`${ APP_URL }/images/surveyImages/${category}/${choice.image}`} />
      </div>
    )
  })

  return (
    <div
      name={category}
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        overflowX: 'scroll'
      }}>
      {choiceBoxes}
    </div>
)
}

export default SurveyChoices
