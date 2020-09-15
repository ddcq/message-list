import React, { ReactElement, useCallback } from 'react'
import { List } from 'react-md'
import { useDispatch } from 'react-redux';
import { removeMessageAsync } from '../../actions/messages';
import { Message } from '../../types';
import MessageItem from './message-item';

interface Props {
    messages: Message[];
}

function MessageList({ messages }: Props): ReactElement {
    const dispatch = useDispatch();
    const onDelete = useCallback((message) => dispatch(removeMessageAsync(message)), [dispatch]);
    return (
        <List>
            {messages.map(message => <MessageItem
                key={message.id}
                onDelete={onDelete}
                message={message}
            />)}
        </List >
    )
}

export default MessageList




