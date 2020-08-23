// App Imports
import Detail from '../../modules/product/Detail'

// Product routes
export default {
  product: {
    path: (slug = ':slug') => (`/product/${ slug }`),
    component: Detail
  }
}

// How we get a single item from the entire stock. ':slug' is a dynamic
// route parameter, so the slug will route us to the specific item that was
// clicked. An item's slug is part of the info we get when retriving all the
// items to populate our stock.
