import { AnyAction, Store } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { deleteMessage, getMessages, postMessage } from "../api/messages"
import { fetchMessages, removeMessage, addMessages } from "../store/messages/actions"
import RootState from "../store/root-state";
import { Message } from "../types";

export async function fetchMessagesAsync(store: Store<RootState, AnyAction>) {
    store.dispatch(fetchMessages.started({}))
    return getMessages()
        .then((messages) => {
            store.dispatch(
                fetchMessages.done({
                    params: {},
                    result: messages,
                })
            )
        })
        .catch((e) => {
            store.dispatch(
                fetchMessages.failed({
                    params: {},
                    error: e.message,
                })
            );
        });
}

export const addMessageAsync = (message: Message) =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(addMessages.started(message))
        return postMessage(message)
            .then((messages) => {
                dispatch(
                    addMessages.done({
                        params: message,
                        result: messages,
                    })
                )
            })
            .catch((e) => {
                dispatch(
                    addMessages.failed({
                        params: message,
                        error: e.message,
                    })
                );
            });
    }

export const removeMessageAsync = (message: Message) =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(removeMessage.started(message))
        return deleteMessage(message)
            .then((messages) => {
                dispatch(
                    removeMessage.done({
                        params: message,
                        result: messages,
                    })
                )
            })
            .catch((e) => {
                dispatch(
                    removeMessage.failed({
                        params: message,
                        error: e.message,
                    })
                );
            });
    }
