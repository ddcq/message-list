import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AsyncActionCreators } from 'typescript-fsa';
import { deleteAllMessages, deleteMessage, getMessages, postMessage } from '../api/messages';
import { addMessages, fetchMessages, removeAllMessages, removeMessage } from '../store/messages/actions';
import { Message } from '../types';

const callAsync = (
    apiFunc: (arg0?: Message) => Promise<Message[]>,
    actionCreator: AsyncActionCreators<Message, Message[], string> | AsyncActionCreators<{}, Message[], string>
) => (
    message?: Message
) => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    const params = message || {} as Message;
    dispatch(actionCreator.started(params));
    return apiFunc(message)
        .then((messages) => {
            dispatch(actionCreator.done({ params, result: messages }))
        })
        .catch((e) => {
            dispatch(actionCreator.failed({ params, error: e.message }));
        });
}

export const fetchMessagesAsync = callAsync(getMessages, fetchMessages);
export const addMessageAsync = callAsync(postMessage, addMessages);
export const removeMessageAsync = callAsync(deleteMessage, removeMessage);
export const removeAllMessagesAsync = callAsync(deleteAllMessages, removeAllMessages);
