// Imports
// base components
import React, { PureComponent } from 'react'
// allows us to user .prop?
import PropTypes from 'prop-types'
// react-redux components
import { connect } from 'react-redux'
// Helmet feels like it is 'ontop'
import { Helmet } from 'react-helmet'

// UI Imports
// grid is a style format
import { Grid, GridCell } from '../../ui/grid'
// header properties
import { H3 } from '../../ui/typography'
// background colors
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
// getCratesList is an alias for getList action defined in './api/actions'
// getList -> generate a list of the crates in desc order with 
// fields: 'id', 'name', 'description', 'createdAt', 'updatedAt'
import { getList as getCratesList } from './api/actions'
// Loading is a page flash message that says 'loading...'
import Loading from '../common/Loading'
// EmptyMessage is a paragraph that displays a message based on 'props.message' (given as argument)
// starting to think of props as 'params'
import EmptyMessage from '../common/EmptyMessage'
// CrateItem dne in ./Item, but I believe its related to item
// cant find CrateItem...
import CrateItem from './Item'

// Component (list)
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCratesList('ASC'))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCratesList('ASC')
  }
// this displays text and data on screen
// being pulled in from routes/crate/list
  render() {
    // console.log(this);
    // console.log(this.props);
    // console.log(this.props.crates);
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Crates for everyone! - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Crates for everyone!</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>You can choose crate which suits your need. You can also
              subscribe to multiple crates.</p>
          </GridCell>
        </Grid>

        {/* Crate list */}
        <Grid>
          <GridCell>
            {

              this.props.crates.isLoading
                ? <Loading/>
                : this.props.crates.list.length > 0
                // iterate over each crate and display info
                // where is the subscribe button
                // follow CrateItem -> import CrateItem from './Item'
                    ? this.props.crates.list.map(crate => (
                      <div key={crate.id} style={{ margin: '2em', float: 'left' }}>
                        <CrateItem crate={crate}/>
                      </div>
                    ))
                    : <EmptyMessage message="No crates to show" />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCratesList: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    crates: state.crates
  }
}

export default connect(listState, { getCratesList })(List)
