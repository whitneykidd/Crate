// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'

// App Imports
import { getRelatedList as getProductRelatedList } from '../product/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import ProductItem from '../product/Item'

// Component
class Related extends PureComponent {

  componentDidMount() {
    this.refresh(this.props.productId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productId !== this.props.productId) {
      this.refresh(nextProps.productId)
    }
  }

  refresh = (productId) => {
    this.props.getProductRelatedList(productId)
  }
//  This puts the item on the page. At the moment I am returing an error
// error: "Cannot read property 'length' of null"
  render() {
    const { isLoading, list } = this.props.productsRelated
    // console.log(`list.length: ${list.length}`)

    return (
      <div>
        {/* Related product list */}
        <Grid>
          {
            isLoading // isLoading is a status. 
              ? <Loading />
              // if list is null then this will break. 
              : (list && list.length > 0)
              // :  list.length > 0
              // : list !== null || list !== []
              // : list !== null && Array.isArray(list)// list.length > 0
              
                ? list.map(product => (
                    <GridCell key={product.id} style={{ textAlign: 'center' }}>
                      <ProductItem product={product}/>
                    </GridCell>
                  ))
                  // if no related products, show this. I'd like to jump directly to this if list === null
                : <GridCell>
                    <EmptyMessage message="No related products to show." />
                  </GridCell>
          }
        </Grid>
      </div>
    )
  }
}

// Component Properties
Related.propTypes = {
  productId: PropTypes.number.isRequired,
  productsRelated: PropTypes.object.isRequired,
  getProductRelatedList: PropTypes.func.isRequired
}

// Component State
function relatedState(state) {
  return {
    productsRelated: state.productsRelated
  }
}

export default withRouter(connect(relatedState, { getProductRelatedList })(Related))
