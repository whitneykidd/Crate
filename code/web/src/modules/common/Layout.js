// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Icon from '../../ui/icon/Icon'
import { white, black } from '../../ui/common/colors'
import { level2 } from '../../ui/common/shadows'

// App Imports
import { renderIf } from '../../setup/helpers'
import { messageHide } from './api/actions'
import Header from './header/Header'

class Layout extends PureComponent {

  render() {
    const { children } = this.props

    return (
      <div>
        {/* Header */}
        <Header/>

        {/* Page Content */}
        <section style={{ marginTop: '5em' }}>
          {children}
        </section>

        {/* Messages */}
        {renderIf(this.props.common.message.open, () => (
          <div style={{
            boxShadow: level2,
            position: 'fixed',
            right: '2em',
            bottom: '2em',
            backgroundColor: black,
            color: white,
            borderRadius: '3em',
            maxWidth: '30em'
          }}>
            <span style={{
              float: 'left',
              padding: '1em 0em 1em 2em',
              marginRight: '4em'
            }}>{this.props.common.message.text}</span>

            <Icon
              style={{ position: 'absolute', padding: '1em', cursor: 'pointer', right: '0.5em', top: 0 }}
              onClick={this.props.messageHide}
            >
              close
            </Icon>
          </div>
        ))}
      </div>
    )
  }
}

// Component Properties
Layout.propTypes = {
  common: PropTypes.object.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function commonState(state) {
  return {
    common: state.common
  }
}

export default connect(commonState, { messageHide })(Layout)

// We can reference setup/client/App to view the children from this.props
// It's a Switch component that comes from react-router-dom, which basically
// establishes all the routes our app will display. This is rendered below our
// header component which renders our nav link, as the comment on line 26 suggest
// this is our main page content. After which, a helper function is invoked to
// control the rendering of a message (what we see when we subscribe/unsubscribe from
// a crate) on the botton right corner. This is where common's api
// folder (state.js & actions.js) are put to use to manage the message display.
// NOTE: As component name suggest, this defines our App's layout. App is a functional
// component that renders this layout.
