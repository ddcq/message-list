import { expect } from "chai";
import faker from "faker";
import { Message, VISIBILITY } from "../../../types";
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
            result = reducer(undefined, fetchMessages.failed({ params: {}, error }));
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
        const messages: Message[] = [{ text: faker.random.words(), visibility: VISIBILITY.PUBLIC }];
        beforeEach(() => {
            result = reducer(undefined, fetchMessages.done({ params: {}, result: messages }));
        })
        it('sets the loading flag', () => {
            expect(result.loading).to.be.false;
        });
        it('sets the error message', () => {
            expect(result.messages).to.eq(messages);
        });
    });
});
