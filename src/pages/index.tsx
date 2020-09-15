import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react'
import { Text, TextContainer } from 'react-md'
import { useSelector } from 'react-redux';
import { fetchMessagesAsync } from '../actions/messages';
import MessageList from '../components/message/message-list'
import { wrapper } from '../store';
import { selectMessages } from '../store/messages/selectors';
import { Message } from '../types';

export interface MessagesPageProps {
  messages: Message[];
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await fetchMessagesAsync(store);
    return {};
  });


export default function Messages(): ReactElement {
  const messages = useSelector(selectMessages);
  return (
    <TextContainer>
      <Text type="headline-4">Messages</Text>

      <Link href="/message-create">
        Créer un nouveau message
      </Link>

      <br/>
      { messages && !!messages.length && <MessageList messages={messages} />}
      { messages && !messages.length && <Text type="headline-5">Aucun message</Text>}
    </TextContainer>
  )
}

