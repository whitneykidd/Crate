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

// App Imports
// import { someAction } from './api/actions'

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
    if (status) {
      this.setState({[category]: this.state[category].filter(previousChoice => previousChoice.id !== choice.id)})
    } else {
      this.setState({[category]: [...this.state[category], selection]})
    }
  }

  generateGarmentCheckboxes = (/*array of garments*/) => {
    // create a div or section to hold the garments in the section
    // iterate over array of garments
    // for each garment return a check box with a key or id, relative to its style
    // will do one for each garment choiceCategory
  }





  render() {
    return (
      <section>
        <H1 font='secondary'>Style Survey</H1>
          <form>
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
// function styleSurveyReduxState(state) {
//   return state
// }

// export default connect(styleSurveyReduxState, { /* someAction */ })(StyleSurvey)
export default StyleSurvey

