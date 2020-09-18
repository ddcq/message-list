import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { Action, applyMiddleware, createStore, Middleware } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root-reducer';
import RootState from './root-state';

const logger: Middleware = ({ getState }) => {
	return (next) => (action) => {
		console.log('will dispatch', action);

		// Call the next dispatch method in the middleware chain.
		const returnValue = next(action);

		console.log('state after dispatch', getState());

		// This will likely be the action itself, unless
		// a middleware further in chain changed it.
		return returnValue;
	};
};

// create a makeStore function
const makeStore: MakeStore<RootState> = (_context: Context) =>
	createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type AppThunk<T> = ThunkAction<T, RootState, {}, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, {}, Action<string>>;
