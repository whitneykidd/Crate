// IMPORTS!
// Imports

// UI Imports

// App imports
import { updateStyle } from '../user/api/actions'
import { create } from '../subscriptions/api/actions'

// Component Style Survey
class StyleSurvey extends PureComponent {
  // functions

  // need to display all the style options
  render ()
  // clickables, only 2 per category 
  // click submit 

  onClickSubmit = (styleResults, crateId) => { // styleResults should be an array of user choices 
    this.setState({
      isLoading: true //because I'm following convention 
    })

    this.props.messageShow('Determining your style, please wait...')
    this.props.updateStyle({ styleResults })
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          // check for errors. if they exist, show them
          this.props.messageShow(response.data.errors[0].message) 
        } else {
          // flash success
          this.props.messageShow('Subscribed and Generated Stlye') // we did 2 things 
          // redirect to mysubscriptions
          this.props.history.push(userRoutes.subscriptions.path)
        }
      })

  }

  // render() {
  //   return (

  //   )
  // }

}
