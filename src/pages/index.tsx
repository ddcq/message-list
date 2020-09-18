import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { Button, DialogFooter, Text, TextContainer } from 'react-md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessagesAsync, removeAllMessagesAsync } from '../actions/messages';
import MessageList from '../components/message/message-list';
import { AppThunkDispatch, wrapper } from '../store';
import { selectMessages } from '../store/messages/selectors';
import { Message } from '../types';

export interface MessagesPageProps {
	messages: Message[];
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
	await (store.dispatch as AppThunkDispatch)(fetchMessagesAsync());
	return {};
});

export default function Messages(): ReactElement {
	const router = useRouter();
	const messages = useSelector(selectMessages);
	const dispatch = useDispatch();

	return (
		<TextContainer>
			<Text type="headline-4">Messages</Text>

			<DialogFooter>
				<Button id="mli-delete-all-btn" theme="secondary" onClick={() => dispatch(removeAllMessagesAsync())}>
					Supprimer tous les messages
				</Button>
				<Button id="mli-create-message-btn" theme="primary" onClick={() => router.push('/message-create')}>
					Créer un nouveau message
				</Button>
			</DialogFooter>
			{messages && !!messages.length && <MessageList messages={messages} />}
			{messages && !messages.length && <Text type="headline-5">Aucun message</Text>}
		</TextContainer>
	);
}
