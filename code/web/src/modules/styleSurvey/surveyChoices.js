import React from 'react'
import { APP_URL } from '../../setup/config/env'

const SurveyChoices = ({ choices, handleChange }) => {
  const choiceBoxes = choices.map( (choice, index) => {
    return (
      <>
        <input type='checkbox'
          key={index}
          value={`${choice.style}`}
          name='accessories'
          isChecked={false}
          onChange={(event) => this.handleChange(event)}
      />
      <img style={{
          height: '200px',
          width: '150px',
          display: 'inline'
        }}
        src={`${ APP_URL }/images/surveyImages/accessories${choice.image}`} />
      </>
    )
  })

  return (
    <div
      name="accessories"
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
