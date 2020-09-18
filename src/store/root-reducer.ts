import { AnyAction, combineReducers, Reducer } from 'redux';
import RootState from './root-state';

import messages from './messages/reducer';
import { HYDRATE } from 'next-redux-wrapper';
import { MessagesAction } from './messages/actions';

const combinedReducer = combineReducers<RootState>({
	messages,
});

const reducer: Reducer<RootState, MessagesAction> = (state: RootState | undefined, action: AnyAction) => {
	if (action.type === HYDRATE) {
		const nextState: RootState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	} else {
		return combinedReducer(state, action);
	}
};
export default reducer;
