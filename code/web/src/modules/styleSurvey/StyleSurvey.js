// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './surveyChoices'
import accessories from '../../ui/surveyImages/accessories'
// import e from 'express'
// import { connect } from 'react-redux'

// App Imports
// import { someAction } from './api/actions'

// Component
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

  handleChange(event) {
    // event.preventDefault()
    //
    this.setState({[event.target.name]: [...this.state[event.target.name], event.target.name]})
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
      <SurveyChoices choices={accessories}/>
        <h1>Style Survey</h1>
        <section onChange={event => this.handleChange(event)}>
          <h2>Tops</h2>
          {/* here is where the generateGarmentCheckboxes section will go */}
          <input type='checkbox' name='tops'/>
          <input type='checkbox' name='tops'/>
          <input type='checkbox' name='tops'/>
          <input type='checkbox' name='tops'/>
        </section>
        <section onChange={event => this.handleChange(event)}>
          <h2>Bottoms</h2>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>

        </section>
        <section onChange={event => this.handleChange(event)}>
          <h2>Dresses</h2>
          <input type='checkbox' name='dresses'/>
          <input type='checkbox' name='dresses'/>
          <input type='checkbox' name='dresses'/>
          <input type='checkbox' name='dresses'/>
        </section>
        <section onChange={event => this.handleChange(event)}>
          <h2>Shoes</h2>
          <input type='checkbox' name='shoes'/>
          <input type='checkbox' name='shoes'/>
          <input type='checkbox' name='shoes'/>
          <input type='checkbox' name='shoes'/>
        </section>
        <section onChange={event => this.handleChange(event)}>
          <h2>Accessories</h2>
          <input type='checkbox' name='accessories'/>
          <input type='checkbox' name='accessories'/>
          <input type='checkbox' name='accessories'/>
          <input type='checkbox' name='accessories'/>
        </section>
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

