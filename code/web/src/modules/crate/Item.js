// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports

import { APP_URL } from '../../setup/config/env'
// routes avaliable to the user: login, singup, profile, subscriptions
// and one day: styleSurvey
import userRoutes from '../../setup/routes/user'
// dispaly and hide messages based on boolean conditions
import { messageShow, messageHide } from '../common/api/actions'
// create is an action imported that will create a subcsription tied to user and crate
import { create } from '../subscription/api/actions'

// Component
class Item extends PureComponent {

  // has access to props?
  // or uses props?
  constructor(props) {
    super(props)
    // isLoading is a state, apparently we dont need to load on this page
    this.state = {
      isLoading: false
    }
  }

  // when a user clicks subscribe take the crateId and do the following
  onClickSubscribe = (crateId) => {
    this.setState({
      // we're now loading
      isLoading: true
    })

    // dispaly message while loading
    this.props.messageShow('Subscribing, please wait...')
// crate is a method passed from subscriptions/api/actions
// passes an argument of crateID
// follow it
    this.props.create({ crateId })
      .then(response => {
        // if errors, dispaly them
        if (response.data.errors && response.data.errors.length > 0) {
          // 'messageShow' is a function called from common/api/actions
          this.props.messageShow(response.data.errors[0].message)
        // need a second if statement if this is the first subscrption 
        // } else if (this.props.user.details.style === null) {
        //   this.props.messageShow('Subscribed successfully.')
        // new user path: StyleSruvey
        //   this.props.history.push(userRoutes.styleSurvey.path)
      } else {
        // console.log(this.props)
          // successful subscription show this message then redirect
          this.props.messageShow('Subscribed successfully.')
          // redirect to userRoutes subscriptions path
          // follow it to --> /web/src/setup/routes/user
          // history is path related
          this.props.history.push(userRoutes.subscriptions.path)
        }
      })
      // or there is an error from the api call
      .catch(error => {
        this.props.messageShow('There was some error subscribing to this crate. Please try again.')
      })
      .then(() => {
        this.setState({
          // after error is caught we are 'done' loading
          isLoading: false
        })

        window.setTimeout(() => {
          // if it takes too long forget the message
          this.props.messageHide()
        }, 5000)
      })
  }

  // render is a function for displaying data
  // from 'react'
  render() {
    // curious about this format. 
    // does this mean that `crate` has `id, name, description`?
    // if so this will be useful for displaying a users stlye
    const { id, name, description } = this.props.crate
    const { isLoading } = this.state

    return (
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={name} style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          {/* header with the name fo the crate: 'clothes for women'*/}
          <H4 font="secondary" style={{ color: black }}>{name}</H4>
          {/* display description, smaller below the name */}
          <p style={{ color: grey2, marginTop: '1em' }}>{description}</p>

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
            // this is where the magic happens. 
            // on click, the action will be bound to `this` and the crate `id`
            // feels like arguments being passed
              theme="primary"
              // without binding 'this' the contents would change
              // this is defined on execution
              // becuase we are binding 'this' it will use this enviornment 
              // otherwise 'this' would refere to the button
              onClick={this.onClickSubscribe.bind(this, id)}
              type="button"
              // if loading, dont display subscribe button
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>add</Icon> Subscribe
            </Button>
          </p>
        </div>
      </Card>
    )
  }
}

// Component Properties
Item.propTypes = {
  // this is where we set the values attatched to 'props'
  // or are these what we have access to?
  // difference between `object` and `func` `isRequired`?
  crate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}
// export everything we created
// similar to mapping state, but also actions
// with router lets app know 

export default connect(itemState, { create, messageShow, messageHide })(withRouter(Item))
