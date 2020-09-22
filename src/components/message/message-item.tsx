import React, { ReactElement } from 'react';
import { DeleteSVGIcon, LockSVGIcon, SimpleListItem } from 'react-md';
import { Message, VISIBILITY } from '../../types';
import Container from '../container';

export interface MessageItemProps {
	message: Message;
	onDelete: Function;
}

export default function MessageItem({ onDelete, message }: MessageItemProps): ReactElement {
	const handleDelete = () => {
		onDelete(message);
	};
	const isPrivate = message.visibility === VISIBILITY.PRIVATE;
	return (
		<Container>
			<SimpleListItem
				rightAddon={
					<DeleteSVGIcon
						id="mi-delete-icon"
						style={{
							marginLeft: 'auto',
						}}
						onClick={handleDelete}
					/>
				}
				leftAddon={isPrivate && <LockSVGIcon id="mi-lock-icon" />}
				id={'message-item-' + message.id}
			>
				{isPrivate ? <i>{message.text}</i> : message.text}
			</SimpleListItem>
		</Container>
	);
}
