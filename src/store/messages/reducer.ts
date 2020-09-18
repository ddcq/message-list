import produce from 'immer'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addMessage, fetchMessages, removeAllMessages, removeMessage } from './actions'
import { INITIAL_STATE } from './state'

export default reducerWithInitialState(INITIAL_STATE)
  .cases(
    [fetchMessages.started, addMessage.started, removeMessage.started, removeAllMessages.started],
    (state) => {
      return produce(state, (draft) => {
        draft.loading = true
      })
    }
  )
  .cases(
    [fetchMessages.done, addMessage.done, removeMessage.done, removeAllMessages.done],
    (state, payload) => {
      return produce(state, (draft) => {
        draft.loading = false
        draft.messages = payload.result
      })
    }
  )
  .cases(
    [fetchMessages.failed, addMessage.failed, removeMessage.failed, removeAllMessages.failed],
    (state, payload) => {
      return produce(state, (draft) => {
        draft.loading = false
        draft.error = payload.error
      })
    }
  )
