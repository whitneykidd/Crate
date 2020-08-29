// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SurveyChoices from './surveyChoices'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import userRoutes from '../../setup/routes/user.js'

// Survey Data
import accessories from '../../../public/images/surveyImages/accessories/index'
import bottoms from '../../../public/images/surveyImages/bottoms/index'
import dresses from '../../../public/images/surveyImages/dresses/index'
import shoes from '../../../public/images/surveyImages/shoes/index'
import tops from '../../../public/images/surveyImages/tops/index'
// UI imports
import { H1 } from '../../ui/typography'

// Actions
import { messageShow, messageHide } from '../common/api/actions'
import { create } from '../subscription/api/actions'
import { postUserSurvey } from './api/actions.js'

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

  handleChoice = (choice, status) => {
    const { category, value } = choice.dataset
    const selection = {
      value,
      id: choice.id
    }
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

  getPendingSubscription = () => {
    return JSON.parse(localStorage.getItem('pendingSubscription'))
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
    const requestVariables = {id: this.props.user.details.id, style:styleString}
    const crateId = this.getPendingSubscription()
    this.props.postUserSurvey(requestVariables)
      .then((response) => {
        console.log(response, 'in tehn')
        if(response.status === 200) {
          this.props.messageShow(`Style updated to ${response.data.data.userUpdate.style}`)
        }
      })
    this.props.create({ crateId })
      .then(response => {
        localStorage.clear()
        this.props.history.push(userRoutes.subscriptions.path)
      })
    window.setTimeout(() => {
      this.props.messageHide()
    }, 3500)
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
StyleSurvey.propTypes = {
  user: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
  postUserSurvey: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function styleSurveyState(state) {
  return {
    user: state.user
  }
}

export default connect(styleSurveyState, { postUserSurvey, messageHide, messageShow, create })(withRouter(StyleSurvey))/* connects actions and state */
