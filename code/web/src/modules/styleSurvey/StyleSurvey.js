// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './surveyChoices'
import accessories from '../../../public/images/surveyImages/accessories/index'
import bottoms from '../../../public/images/surveyImages/bottoms/index'
import dresses from '../../../public/images/surveyImages/dresses/index'
import shoes from '../../../public/images/surveyImages/shoes/index'
import tops from '../../../public/images/surveyImages/tops/index'
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

  handleChange = (event) => {
    const choice = event.target.closest('span')
    const status = choice.getAttribute('aria-checked')
    console.log(status)
    // const selection = choice.children[0]
    // console.log(selection.selected, 'hello')
    // this.setState({[choice.dataset.category]: [...this.state[choice.dataset.category], selection.value]})
  }

  generateGarmentCheckboxes = (/*array of garments*/) => {
    // create a div or section to hold the garments in the section
    // iterate over array of garments
    // for each garment return a check box with a key or id, relative to its style
    // will do one for each garment choiceCategory
  }





  render() {
    return (
      <form>
        <SurveyChoices
          choices={accessories}
          handleChange={this.handleChange}
          choiceCategory='accessories'
        />
        <SurveyChoices
          choices={bottoms}
          handleChange={this.handleChange}
          choiceCategory='bottoms'
        />
        <SurveyChoices
          choices={dresses}
          handleChange={this.handleChange}
          choiceCategory='dresses'
        />
        <SurveyChoices
          choices={shoes}
          handleChange={this.handleChange}
          choiceCategory='shoes'
        />
        <SurveyChoices
          choices={tops}
          handleChange={this.handleChange}
          choiceCategory='tops'
        />
      </form>
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

