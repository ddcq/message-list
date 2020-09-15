import React, { ReactElement, useCallback, useState } from 'react';
import { CircularProgress, DeleteSVGIcon, ListItem } from 'react-md';
import { Message } from '../../types';

interface Props {
    message: Message;
    onDelete: Function;
}

export default function MessageItem({ onDelete, message }: Props): ReactElement {
    const [loading, setLoading] = useState(false);
    const handleDelete = useCallback(() => {
        setLoading(true);
        onDelete(message).then(() => {
            setLoading(false);
        });
    }, [loading]);
    return <ListItem
        rightAddon={loading ? <CircularProgress id="dm-circular"/> : <DeleteSVGIcon onClick={handleDelete} />}>
        {message.text}
    </ListItem>;
}
