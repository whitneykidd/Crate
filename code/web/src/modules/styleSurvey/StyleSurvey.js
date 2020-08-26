// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// App Imports
// import { someAction } from './api/actions'

// Component
class StyleSurvey extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // this.props.someAction()
  }

  render() {
    return (
      <div>
        <h1>Style Survey</h1>
        <div>
            <h2>Tops</h2>
        </div>
        <button>HELLO</button>
        <button>WHATS UP</button>
      </div>
    )
  }
}

// Component Properties
StyleSurvey.propTypes = {
  dummyId: PropTypes.number.isRequired,
  // someAction: PropTypes.func.isRequired,
}

// Component State
// function styleSurveyReduxState(state) {
//   return state
// }

// export default connect(styleSurveyReduxState, { /* someAction */ })(StyleSurvey)
export default StyleSurvey

