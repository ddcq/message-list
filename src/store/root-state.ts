import MessagesState, { NAME as MESSAGES_REDUCER_NAME } from './messages/state'

export default interface RootState {
  [MESSAGES_REDUCER_NAME]: MessagesState
}
