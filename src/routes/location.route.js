import { injectReducer } from '../store/reducers'

export default (store) => ({
  path: '/locations',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Location = require('../containers/location').default
      const reducer = require('../containers/location.reducers').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'location', reducer })

      /*  Return getComponent   */
      cb(null, Location)

    /* Webpack named bundle   */
    }, 'location')
  }
})
