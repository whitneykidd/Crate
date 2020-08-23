// App Imports
import Home from '../../modules/pages/Home'
import Men from '../../modules/pages/Men'
import Women from '../../modules/pages/Women'
import HowItWorks from '../../modules/pages/HowItWorks'
import WhatsNew from '../../modules/pages/WhatsNew'

// Home routes
export default {
  home: {
    path: '/',
    component: Home,
    exact: true
  },

  men: {
    path: '/men',
    component: Men
  },

  women: {
    path: '/women',
    component: Women
  },

  howItWorks: {
    path: '/how-it-works',
    component: HowItWorks
  },

  whatsNew: {
    path: '/whats-new',
    component: WhatsNew
  }
}

// These are considered home routes, this could be because these routes are
// all accessible from the whole app via the header nav bar.
