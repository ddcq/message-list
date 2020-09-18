import { expect } from 'chai';
import RootState from '../../root-state';
import { selectError, selectLoading, selectMessages } from '../selectors';
import faker from 'faker';
import { Message, VISIBILITY } from '../../../types';

describe('store/messages/selectors', () => {
	const buildMessage: () => Message = () => ({
		id: faker.random.number(),
		text: faker.lorem.sentence(),
		visibility: VISIBILITY.PUBLIC,
	});
	const INITIAL_STATE: RootState = { messages: {} };
	describe('selectMessages', () => {
		it('should return default value', () => {
			const result = selectMessages(INITIAL_STATE);
			expect(result).to.be.an('array');
			expect(result).to.be.empty;
		});
		it('should return messages', () => {
			const state: RootState = {
				messages: {
					messages: [buildMessage(), buildMessage()],
				},
			};
			const result = selectMessages(state);
			expect(result).to.equal(state.messages.messages);
		});
	});
	describe('selectLoading', () => {
		it('should return default value', () => {
			const result = selectLoading(INITIAL_STATE);
			expect(result).to.be.false;
		});
		it('should return messages', () => {
			const state: RootState = {
				messages: {
					loading: true,
				},
			};
			const result = selectLoading(state);
			expect(result).to.be.true;
		});
	});
	describe('selectError', () => {
		it('should return default value', () => {
			const result = selectError(INITIAL_STATE);
			expect(result).to.equal('');
		});
		it('should return messages', () => {
			const state: RootState = {
				messages: {
					error: faker.lorem.words(),
				},
			};
			const result = selectError(state);
			expect(result).to.equal(state.messages.error);
		});
	});
});
