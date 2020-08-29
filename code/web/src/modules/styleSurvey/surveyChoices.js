import React, {useRef} from 'react'
import { APP_URL } from '../../setup/config/env'
import { H3 } from '../../ui/typography'

const SurveyChoices = ({ choices, handleChoice, choiceCategory }) => {
  const handleChange = (event) => {
    const choice = event.target.closest('span')
    const selected = choice.getAttribute('aria-checked') === 'true'
    handleChoice(choice, selected)
    if (selected) {
      choice.setAttribute('aria-checked', 'false')
    } else {
      choice.setAttribute('aria-checked', 'true')
    }
  }

  const createStyles = (choiceId) => {
    const selectedStyle = {
      margin: '5px',
      padding: '3px',
      border: '3px double #333'
    }
    const unselectedStyle = {
      margin: '5px',
      padding: '3px'
    }

    // const choice = document.getElementById(`${choiceId}`)

    return false ? selectedStyle : unselectedStyle
  }

  const choiceBoxes = category => {
    return choices.map((choice, index) => {
      const choiceId = `${category}${index}`
      return (
        <span
          key={index}
          id={choiceId}
          data-category={category}
          data-value={choice.style}
          aria-checked={false}
          style={createStyles(choiceId)}
          onClick={event => handleChange(event)}
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
