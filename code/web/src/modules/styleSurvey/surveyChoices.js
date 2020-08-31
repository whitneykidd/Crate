import React, {useCallback} from 'react'
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

  const createStyles = useCallback(node => {
    const selectedStyle =`
      margin: 5px;
      padding: 3px;
      border: 3px double #333;
    `
    const unselectedStyle = `
      margin: 5px;
      padding: 3px;
    `

    if (node !== null) {
      const status = node.getAttribute('aria-checked') === 'true'
      return status ? node.setAttribute('style', selectedStyle)
        : node.setAttribute('style', unselectedStyle)
    }
  })

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
          ref={createStyles}
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
