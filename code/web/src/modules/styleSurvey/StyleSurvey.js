// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './surveyChoices'
import accessories from '../../../public/images/surveyImages/accessories/index'
import bottoms from '../../../public/images/surveyImages/bottoms/index'
import dresses from '../../../public/images/surveyImages/dresses/index'
import shoes from '../../../public/images/surveyImages/shoes/index'
import tops from '../../../public/images/surveyImages/tops/index'
import { H1 } from '../../ui/typography'
// import e from 'express'
// import { connect } from 'react-redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { postUserSurvey } from './api/actions.js'


// Component
// import { APP_URL } from '../../setup/config/env'

class StyleSurvey extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      tops: [],
      bottoms: [],
      dresses: [],
      shoes: [],
      accessories: []
    }
  }

  componentDidMount() {
    // this.props.someAction()
  }

  handleChoice = (choice, status) => {
    const { category, value } = choice.dataset
    const selection = {
      value,
      status,
      id: choice.id
    }
    console.log(status)
    if (status) {
      this.setState({
        [category]: this.state[category].filter(previousChoice => previousChoice.id !== choice.id)
      })
    } else {
      this.setState({
        [category]: [...this.state[category], selection]
      })
    }
  }

  handleSubmission = (event) => {
    event.preventDefault()
    const categories = Object.keys(this.state)
    const styleChoices = categories.reduce((choices, category) => {
      this.state[category].map(choice => {
        console.log(choice)
        choices = [...choices, choice.value ]
      })
      this.setState({[category]: []})
      return choices
    }, [])
    const styleString = styleChoices.join(', ')
    console.log(styleString)
  }

  render() {
    return (
      <section>
        <H1 font='secondary'>Style Survey</H1>
        <form onSubmit={() => this.handleSubmission(event)}>
          <SurveyChoices
            choices={accessories}
            handleChoice={this.handleChoice}
            choiceCategory='accessories'
          />
          <SurveyChoices
            choices={bottoms}
            handleChoice={this.handleChoice}
            choiceCategory='bottoms'
          />
          <SurveyChoices
            choices={dresses}
            handleChoice={this.handleChoice}
            choiceCategory='dresses'
          />
          <SurveyChoices
            choices={shoes}
            handleChoice={this.handleChoice}
            choiceCategory='shoes'
          />
          <SurveyChoices
            choices={tops}
            handleChoice={this.handleChoice}
            choiceCategory='tops'
          />
          <button>Submit</button>
      </form>
      </section>
    )
  }
}

// Component Properties
// StyleSurvey.propTypes = {
  // dummyId: PropTypes.number.isRequired,
  // someAction: PropTypes.func.isRequired,
// }

// Component State
function styleSurveyState(state) {
  return {
    styleSurvey: state.styleSurvey
  }
}

// export default connect(styleSurveyReduxState, { /* someAction */ })(StyleSurvey)
export default StyleSurvey

