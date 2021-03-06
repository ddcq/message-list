import actionCreatorFactory, { AsyncAction } from 'typescript-fsa';
import { Message } from '../../types';

const actionCreator = actionCreatorFactory('ddcq:message-list:message');

export const fetchMessages = actionCreator.async<{}, Message[], string>('FETCH_MESSAGES');
export const addMessage = actionCreator.async<Message, Message[], string>('ADD_MESSAGE');
export const removeMessage = actionCreator.async<Message, Message[], string>('DELETE_MESSAGE');
export const removeAllMessages = actionCreator.async<{}, Message[], string>('DELETE_All_MESSAGES');

export type MessagesAction = AsyncAction<unknown, Message[], string> | AsyncAction<Message, Message[], string>;
