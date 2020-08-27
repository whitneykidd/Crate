// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    event.preventDefault()
    // 
    this.setState({[event.target.name]: event.target.value})
  }

  // make a function that will make the section for us

  generateButtonSections = (name) => {
    // for each image return one of the inputs
    // and the name of the input will be name arg
  }



  render() {
    return (
      <form>
        <h1>Style Survey</h1>
        <section>
          <h2>Tops</h2>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='tops'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='tops'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='tops'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='tops'/>
        </section>
        <section>
          <h2>Bottoms</h2>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
        </section>
        <section>
          <h2>Dresses</h2>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
        </section>
        <section>
          <h2>Shoes</h2>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
          <input onClick={event => this.handleChange(event)} type='checkbox' name='bottoms'/>
        </section>
        <section>
          <h2>Accessories</h2>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>
          <input type='checkbox' name='bottoms'/>
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

