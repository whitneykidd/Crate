import React from 'react'

const SurveyChoices = ({ choices }) => {
  console.log(choices)
  return choices.map( choice => {
    return (
      <div>
        <input type='checkbox' value={`${choice.style}`} style={{backgroundImage: `url(${choice.image})`}} />
        <img src={`${choice.image}`} />
        <h2>{`${choice.style}`}</h2>
      </div>
    )
  })
}

export default SurveyChoices
