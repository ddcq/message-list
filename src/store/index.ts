import thunk from 'redux-thunk'
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
// import { devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from './root-reducer'
import RootState from './root-state'

// create a makeStore function
const makeStore: MakeStore<RootState> = (_context: Context) => createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {debug: true});