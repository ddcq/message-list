import { ThunkDispatch } from 'redux-thunk';
import { AsyncActionCreators } from 'typescript-fsa';
import { deleteAllMessages, deleteMessage, getMessages, postMessage } from '../api/messages';
import { addMessage, fetchMessages, MessagesAction, removeAllMessages, removeMessage } from '../store/messages/actions';
import RootState from '../store/root-state';
import { Message } from '../types';

const callAsync = (
	apiFunc: (arg0?: Message) => Promise<Message[]>,
	actionCreator: AsyncActionCreators<Message, Message[], string> | AsyncActionCreators<{}, Message[], string>
) => (message?: Message) => (dispatch: ThunkDispatch<RootState, undefined, MessagesAction>) => {
	const params = message || ({} as Message);
	dispatch(actionCreator.started(params));
	return apiFunc(message).then(
		(messages) => {
			dispatch(actionCreator.done({ params, result: messages }));
		},
		(e) => {
			dispatch(actionCreator.failed({ params, error: e.message }));
		}
	);
};

export const fetchMessagesAsync = () => callAsync(getMessages, fetchMessages)(undefined);
export const addMessageAsync = (message: Message) => callAsync(postMessage, addMessage)(message);
export const removeMessageAsync = (message: Message) => callAsync(deleteMessage, removeMessage)(message);
export const removeAllMessagesAsync = () => callAsync(deleteAllMessages, removeAllMessages)(undefined);
