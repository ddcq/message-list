import chai from 'chai';
import faker from 'faker';
import sinon, { SinonExpectation, SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';

import * as ApiMessages from '../../api/messages';
import {
	addMessage,
	fetchMessages,
	MessagesAction,
	removeAllMessages,
	removeMessage,
} from '../../store/messages/actions';
import { Message, VISIBILITY } from '../../types';
import { addMessageAsync, fetchMessagesAsync, removeAllMessagesAsync, removeMessageAsync } from '../messages';
chai.use(sinonChai);
const expect = chai.expect;

describe('actions/messages', () => {
	const sandbox = sinon.createSandbox();
	let dispatchMock: SinonStub<[Function | MessagesAction], Promise<void>>;
	afterEach(() => {
		sandbox.restore();
		sandbox.reset();
	});
	describe('fetchMessagesAsync', () => {
		let getMessagesMock: SinonExpectation;
		let action: Function;

		beforeEach(() => {
			getMessagesMock = sandbox.mock();
			dispatchMock = sandbox.stub();
			dispatchMock.callsFake((action) => {
				if (typeof action === 'function') {
					return action(dispatchMock);
				}
			});
			sandbox.replace(ApiMessages, 'getMessages', getMessagesMock);
		});

		describe('fetch messages succeeds', () => {
			beforeEach(() => {
				getMessagesMock.resolves([]);
				action = fetchMessagesAsync();
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call fetMessages.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, fetchMessages.started.type, {});
				});
			});
			it('should call fetMessages.done', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, fetchMessages.done.type, { params: {}, result: [] });
				});
			});
		});
		describe('fetch messages fails', () => {
			beforeEach(() => {
				getMessagesMock.rejects();
				action = fetchMessagesAsync();
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call fetMessages.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, fetchMessages.started.type, {});
				});
			});
			it('should call fetMessages.failed', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, fetchMessages.failed.type, { params: {}, error: 'Error' });
				});
			});
		});
	});
	describe('addMessageAsync', () => {
		let postMessageMock: SinonExpectation;
		let dispatchMock: SinonStub<[Function | MessagesAction], Promise<void>>;
		let action: Function;
		const message: Message = {
			text: faker.lorem.text(),
			visibility: VISIBILITY.PUBLIC,
		};

		beforeEach(() => {
			postMessageMock = sandbox.mock();
			dispatchMock = sandbox.stub();
			dispatchMock.named('dispatchMock');
			dispatchMock.callsFake((action) => {
				if (typeof action === 'function') {
					return action(dispatchMock);
				}
			});
			sandbox.replace(ApiMessages, 'postMessage', postMessageMock);
		});

		describe('add message succeeds', () => {
			beforeEach(() => {
				postMessageMock.resolves([]);
				action = addMessageAsync(message);
			});
			it('should call addMessage.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, addMessage.started.type, message);
				});
			});
			it('should call addMessage.done', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, addMessage.done.type, { params: message, result: [] });
				});
			});
		});
		describe('add message fails', () => {
			beforeEach(() => {
				postMessageMock.rejects();
				action = addMessageAsync(message);
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call addMessage.started', () => {
				dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, addMessage.started.type, message);
				});
			});
			it('should call addMessage.failed', () => {
				dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, addMessage.failed.type, {
						error: 'Error',
						params: message,
					});
				});
			});
		});
	});
	describe('removeMessageAsync', () => {
		let deleteMessageMock: SinonExpectation;
		let dispatchMock: SinonStub<[Function | MessagesAction], Promise<void>>;
		let action: Function;
		const message: Message = {
			text: faker.lorem.text(),
			visibility: VISIBILITY.PUBLIC,
		};

		beforeEach(() => {
			deleteMessageMock = sandbox.mock();
			dispatchMock = sandbox.stub();
			dispatchMock.named('dispatchMock');
			dispatchMock.callsFake((action) => {
				if (typeof action === 'function') {
					return action(dispatchMock);
				}
			});
			sandbox.replace(ApiMessages, 'deleteMessage', deleteMessageMock);
		});

		describe('remove message succeeds', () => {
			beforeEach(() => {
				deleteMessageMock.resolves([]);
				action = removeMessageAsync(message);
			});
			it('should call removeMessage.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, removeMessage.started.type, message);
				});
			});
			it('should call removeMessage.done', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, removeMessage.done.type, { params: message, result: [] });
				});
			});
		});
		describe('remove message fails', () => {
			beforeEach(() => {
				deleteMessageMock.rejects();
				action = removeMessageAsync(message);
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call removeMessage.started', () => {
				dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, removeMessage.started.type, message);
				});
			});
			it('should call removeMessage.failed', () => {
				dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, removeMessage.failed.type, {
						error: 'Error',
						params: message,
					});
				});
			});
		});
	});
	describe('removeAllMessagesAsync', () => {
		let deleteAllMessagesMock: SinonExpectation;
		let dispatchMock: SinonStub<[Function | MessagesAction], Promise<void>>;
		let action: Function;

		beforeEach(() => {
			deleteAllMessagesMock = sandbox.mock();
			dispatchMock = sandbox.stub();
			dispatchMock.named('dispatchMock');
			dispatchMock.callsFake((action) => {
				if (typeof action === 'function') {
					return action(dispatchMock);
				}
			});
			sandbox.replace(ApiMessages, 'deleteAllMessages', deleteAllMessagesMock);
		});

		describe('delete all messages succeeds', () => {
			beforeEach(() => {
				deleteAllMessagesMock.resolves([]);
				action = removeAllMessagesAsync();
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call fetMessages.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, removeAllMessages.started.type, {});
				});
			});
			it('should call fetMessages.done', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, removeAllMessages.done.type, { params: {}, result: [] });
				});
			});
		});
		describe('delete all messages fails', () => {
			beforeEach(() => {
				deleteAllMessagesMock.rejects();
				action = removeAllMessagesAsync();
			});
			it('should call dispatch thrice', () => {
				return dispatchMock(action).then(() => {
					expect(dispatchMock).to.have.been.calledThrice;
				});
			});
			it('should call fetMessages.started', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 1, removeAllMessages.started.type, {});
				});
			});
			it('should call fetMessages.failed', () => {
				return dispatchMock(action).then(() => {
					testCall(dispatchMock, 2, removeAllMessages.failed.type, { params: {}, error: 'Error' });
				});
			});
		});
	});
});

function testCall(
	dispatchMock: SinonStub<[Function | MessagesAction], Promise<void>>,
	callIdx: number,
	type: string,
	payload: object
) {
	const args: any = dispatchMock.getCall(callIdx).args[0];
	expect(args.type).to.equal(type);
	expect(args.payload).to.eql(payload);
}
