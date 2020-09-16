import React, { ReactElement } from 'react';
import { DeleteSVGIcon, ListItem, LockSVGIcon } from 'react-md';
import { Message, VISIBILITY } from '../../types';
import Container from '../container';

interface Props {
    message: Message;
    onDelete: Function;
}

export default function MessageItem({ onDelete, message }: Props): ReactElement {
    const handleDelete = () => {
        onDelete(message);
    };
    return (
        <Container>
            <ListItem
                rightAddon={<DeleteSVGIcon onClick={handleDelete} />}
                leftAddon={message.visibility === VISIBILITY.PRIVATE && <LockSVGIcon />}
            >
                {
                    message.visibility === VISIBILITY.PRIVATE
                        ? (<i>{message.text}</i>)
                        : message.text
                }
            </ListItem>
        </Container>
    );
}
