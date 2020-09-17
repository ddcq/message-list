import chai from 'chai';
import faker from 'faker';
import React from 'react';
import { List } from 'react-md';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import sinonChai from 'sinon-chai';
import { Message, VISIBILITY } from '../../../types';
import MessageList from '../message-list';
chai.use(sinonChai);
const expect = chai.expect;

describe('components/message/message-list', () => {
	const mockStore = configureStore([])
	let listInstance: renderer.ReactTestInstance
	let messageList: Message[]
	beforeEach(() => {
		messageList = [
			{ id: 1, text: faker.lorem.text(), visibility: VISIBILITY.PUBLIC },
			{ id: 2, text: faker.lorem.text(), visibility: VISIBILITY.PRIVATE }
		]
		const rendered = renderer.create(<Provider store={mockStore({})}><MessageList messages={messageList}/></Provider>)
		listInstance = rendered.root.findByType(List)
	})
	it('should list the message items', () => {
		expect(listInstance.props.children).to.be.an('array')
		expect(listInstance.props.children.length).to.equal(messageList.length)
	})
})
