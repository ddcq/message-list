import produce from 'immer';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addMessages, fetchMessages, removeAllMessages, removeMessage } from './actions';
import { INITIAL_STATE } from './state';

export default reducerWithInitialState(INITIAL_STATE)
  .cases([
    fetchMessages.started,
    addMessages.started,
    removeMessage.started,
    removeAllMessages.started,
  ], (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .cases([
    fetchMessages.done,
    addMessages.done,
    removeMessage.done,
    removeAllMessages.done,
  ], (state, payload) => {
    console.log(JSON.stringify(payload));
    return produce(state, draft => {
      console.log(JSON.stringify(payload));
      draft.loading = false
      draft.messages = payload.result
    })
  })
  .cases([
    fetchMessages.failed,
    addMessages.failed,
    removeMessage.failed,
    removeAllMessages.failed,
  ], (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.error = payload.error
    })
  });