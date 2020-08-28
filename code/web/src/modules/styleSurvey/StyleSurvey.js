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
    console.log(event)
    if(!event.target.isChecked) {
      this.setState({[event.target.name]: [...this.state[event.target.name], event.target.value]})
      event.target.isChecked
    }
  }

  generateGarmentCheckboxes = (/*array of garments*/) => {
    // create a div or section to hold the garments in the section
    // iterate over array of garments
    // for each garment return a check box with a key or id, relative to its style
    // will do one for each garment category
  }





  render() {
    return (
      <form>
        <SurveyChoices
          category='accessories'
          choices={accessories}
          handleChange={this.handleChange}
        />
        <SurveyChoices
          category='bottoms'
          choices={bottoms}
          handleChange={this.handleChange}
        />
        <SurveyChoices
          category='dresses'
          choices={dresses}
          handleChange={this.handleChange}
        />
        <SurveyChoices
          category='shoes'
          choices={shoes}
          handleChange={this.handleChange}
        />
        <SurveyChoices
          category='tops'
          choices={tops}
          handleChange={this.handleChange}
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

