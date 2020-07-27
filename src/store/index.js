/**
 * Initiates Redux store.
 *
 * Redux Toolkit is a framework on top of Redux that provides common middleware
 * and helps enforce best practices by default. We're outsourcing opinions
 * to the Redux ecosystem, which saves us time and reduces our need to write
 * excess boilerplate Redux code by hand.
 *
 * The @reduxjs/toolkit package automatically installs `redux` and
 * `redux-thunk`. In development environments, it will also automatically
 * enable the Redux DevTools extension, and install middleware to check for
 * immutability violations and non-serializable data.
 *
 * To help with not mutating data by accident, reducers created by either
 * `createSlice` or `createReducer` will be wrapped with `produce` from the
 * `immer` library, which allows us to write code that appears to mutate
 * state, and will instead return the correct immutable result. This is magic!
 * It's important to remember that magic is happening!
 *
 * For more info: https://redux-toolkit.js.org/
 *
 */
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

const store = configureStore({
  reducer: reducers
})

export default store
