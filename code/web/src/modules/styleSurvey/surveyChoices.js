import React from 'react'
import { APP_URL } from '../../setup/config/env'
import { H3 } from '../../ui/typography'

const SurveyChoices = ({ choices, handleChoice, choiceCategory }) => {
  const destringifyBoolean = (booleanString) => {
    return booleanString === 'true'
  }

  const handleChange = (event) => {
    const choice = event.target.closest('span')
    const selected = choice.getAttribute('aria-checked') === 'true'
    handleChoice(choice, selected)
    (selected) ?  choice.setAttribute('aria-checked', 'false')
      : choice.setAttribute('aria-checked', 'true')
    }
    // if (selected) {
    //   return {
    //     border: '0px'
    //   }
    // } else {
    //   return {
    //     border: '3px solid'
    //   }
    // }
  }

  const choiceBoxes = category => {
    return choices.map((choice, index) => {
      return (
        <span
          key={index}
          id={`${category}${index}`}
          data-category={category}
          data-value={choice.style}
          aria-checked={false}
          onClick={event => {
            handleChange(event)
            handleStyleChange(event)
          }
          }
          role='checkbox'
        >
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
    <article>
      <H3 font="primary">{choiceCategory}</H3>
      <div
        style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        overflowX: 'scroll'
        }}
      >
        {choiceBoxes(choiceCategory)}
    </div>
    </article>
)
}

export default SurveyChoices
