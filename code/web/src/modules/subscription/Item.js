// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import { messageShow, messageHide } from '../common/api/actions'
import { remove, getListByUser } from '../subscription/api/actions'

// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  // is a user were to click susubscribe we follow this track
  // very similar to the subscribe track
  onClickUnsubscribe = (id) => {
    let check = confirm('Are you sure you want to unsubscribe to this crate?')

    if(check) {
      this.setState({
        // we are now loading
        isLoading: true
      })
      // display a flash message.
      // note this should probbaly say 'Unsubscribing, please wait
      this.props.messageShow('Subscribing, please wait...')

      // remove the subscription given a unique subscription id
      this.props.remove({id})
        .then(response => {
          // if there are errors, display them
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            // otherwise show our success message
            this.props.messageShow('Unsubscribed successfully.')
            // getListByUser is a method to populate the current list of subscriptions
            this.props.getListByUser()
          }
        })
        .catch(error => {
          this.props.messageShow('There was some error subscribing to this crate. Please try again.')
        })
        .then(() => {
          this.setState({
            isLoading: false
          })

          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        })
    }
  }

  render() {
    // render the subscribed crates
    const { id, crate, createdAt } = this.props.subscription
    const { isLoading } = this.state

    return (
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          {/* display the standard box for each subscribed crate */}
          <img src={`${ APP_URL }/images/crate.png`} alt={ crate.name } style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          {/* display the subscribed crate name with formatting */}
          <H4 font="secondary" style={{ color: black }}>{ crate.name }</H4>
          
          {/* display the subscribed crate description with formatting */}
          <p style={{ color: grey2, marginTop: '1em' }}>{ crate.description }</p>

          {/* display a button to unsubscribe. upon unsubscribing attach this and the crate id as passed arguments 
          there is no redirect. we will stay on user/subscriptions but that subscription should be gone*/}
          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="secondary"
              onClick={this.onClickUnsubscribe.bind(this, id)}
              type="button"
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>remove_circle_outline</Icon> Unsubscribe
            </Button>
          </p>

          <p style={{ color: grey2, marginTop: '1em', fontSize: '0.8em', textAlign: 'center' }}>
            Subscribed on { new Date(parseInt(createdAt)).toDateString() }
          </p>
        </div>
      </Card>
    )
  }
}

// Component Properties
// define 'props'
Item.propTypes = {
  subscription: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  getListByUser: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}
// this seems to be responsbile for exporting the class as SubscriptionItem instead of just Item
export default connect(itemState, { remove, getListByUser, messageShow, messageHide })(withRouter(Item))
