import { expect } from "chai";
import faker from "faker";
import { AnyAction } from "typescript-fsa";

import { fetchMessages } from "../actions";
import reducer from "../reducer";
import MessagesState from "../state";

describe('messages reducer', () => {
    describe('on start', () => {
        let result: MessagesState;
        beforeEach(() => {
            result = reducer(undefined, { type: fetchMessages.started });
        })
        it('sets the loading flag', () => {
            expect(result.loading).to.be.true;
        });
    });
    describe('on fail', () => {
        let result: MessagesState;
        const error = faker.random.words();
        beforeEach(() => {
            result = reducer(undefined, {
                type: fetchMessages.failed,
                payload: { error }
            } as AnyAction);
        })
        it('sets the loading flag', () => {
            expect(result.loading).to.be.false;
        });
        it('sets the error message', () => {
            expect(result.error).to.equal(error);
        });
    });
    describe('on done', () => {
        let result: MessagesState;
        const messages = [{ message: faker.random.words() }];
        beforeEach(() => {
            result = reducer(undefined, {
                type: fetchMessages.done,
                payload: { result: messages }
            } as AnyAction);
        })
        it('sets the loading flag', () => {
            expect(result.loading).to.be.false;
        });
        it('sets the error message', () => {
            expect(result.messages).to.eq(messages);
        });
    });
});
