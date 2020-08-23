// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
// getListByUser is a method to return all the subscriptions for a given user
import { getListByUser } from '../subscription/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
// subscriotionItem is a method for creating each subscription crate dispayed on screen
import SubscriptionItem from '../subscription/Item'

// Component
class Subscriptions extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getListByUser())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getListByUser()
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>My Subscriptions - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">My subscriptions</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>The crates you are subscribed to are listed here. You can
              cancel
              anytime.</p>
          </GridCell>
        </Grid>
        {/* This is where my-style should be populated 
        <Grid style={{ backgroundColor: grey}}>
          <GridCell style={{ padding: '2em', textAlign: 'center'}}>
          { 
            this.props.user.details.style 
              ? <H3 font="secondary">Your Style: {props.user.details.style}</H3>
              : <H3 font="secondary">You have no style. Subscrube to a crate to find style</H3>
          }
          </GridCell>
        </Grid>
        */}

        {/* Product list */}
        <Grid>
          <GridCell>
            {
              this.props.subscriptions.isLoading
                ? <Loading/>
                : this.props.subscriptions.list.length > 0
                    ? this.props.subscriptions.list.map(subscription => (
                        <div key={subscription.id} style={{ margin: '2em', float: 'left' }}>
                          <SubscriptionItem subscription={subscription} />
                        </div>
                      ))
                    : <EmptyMessage message="You are not subscribed to any crates yet." />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Subscriptions.propTypes = {
  subscriptions: PropTypes.object.isRequired,
  getListByUser: PropTypes.func.isRequired
}

// Component State
function subscriptionsState(state) {
  return {
    subscriptions: state.subscriptionsByUser
  }
}

export default connect(subscriptionsState, { getListByUser })(Subscriptions)
