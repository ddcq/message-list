import produce from 'immer'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchMessages, removeMessage, addMessages } from './actions'
import { INITIAL_STATE } from './state'

export default reducerWithInitialState(INITIAL_STATE)
  .cases([
    fetchMessages.started,
    addMessages.started,
    removeMessage.started,
  ], (state, _) => {
    return produce(state, draft => {
      draft.loading = true
    })
  })
  .cases([
    fetchMessages.done,
    addMessages.done,
    removeMessage.done,
  ], (state, payload) => {
    console.log(JSON.stringify(payload));
    return produce(state, draft => {
      draft.loading = false
      draft.messages = payload.result
    })
  })
  .cases([
    fetchMessages.failed,
    addMessages.failed,
    removeMessage.failed,
  ], (state, payload) => {
    return produce(state, draft => {
      draft.loading = false
      draft.error = payload.error
    })
  });