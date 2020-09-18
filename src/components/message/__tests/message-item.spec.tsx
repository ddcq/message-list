import chai from 'chai';
import faker from 'faker';
import React from 'react';
import { DeleteSVGIcon, LockSVGIcon, SimpleListItem } from 'react-md';
import * as renderer from 'react-test-renderer';
import sinon, { SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';
import { Message, VISIBILITY } from '../../../types';
import MessageItem from '../message-item';
chai.use(sinonChai);
const expect = chai.expect;

describe('components/message/message-item', () => {
	const sandbox = sinon.createSandbox();
	let onDeleteFake: SinonSpy;
	beforeEach(() => {
		onDeleteFake = sandbox.spy();
	});
	afterEach(() => {
		sandbox.reset();
	});
	describe('public message', () => {
		let listItemInstance: renderer.ReactTestInstance;
		const text: string = faker.lorem.text();
		beforeEach(() => {
			const message: Message = { text, visibility: VISIBILITY.PUBLIC };
			const rendered = renderer.create(<MessageItem message={message} onDelete={onDeleteFake} />);
			listItemInstance = rendered.root.findByType(SimpleListItem);
		});
		it('should write the message', () => {
			expect(listItemInstance.props.children).to.equal(text);
		});
		it('should have a delete icon on the right', () => {
			expect(listItemInstance.props.rightAddon.type).to.equal(DeleteSVGIcon);
		});
		it('should act on a click on the delete icon', () => {
			expect(listItemInstance.props.rightAddon.props.onClick).to.exist;
		});
		it('should not have a lock icon on the left', () => {
			expect(listItemInstance.props.leftAddon).to.be.false;
		});
		describe('click on the delete icon', () => {
			beforeEach(() => {
				listItemInstance.props.rightAddon.props.onClick();
			});
			it('should call onDelete function', () => {
				expect(onDeleteFake).to.have.been.calledOnceWithExactly;
			});
		});
	});
	describe('private message', () => {
		let listItemInstance: renderer.ReactTestInstance;
		const text: string = faker.lorem.text();
		beforeEach(() => {
			const message: Message = { text, visibility: VISIBILITY.PRIVATE };
			const rendered = renderer.create(<MessageItem message={message} onDelete={onDeleteFake} />);
			listItemInstance = rendered.root.findByType(SimpleListItem);
		});
		it('should write the message', () => {
			expect(listItemInstance.props.children.props.children).to.equal(text);
		});
		it('should write the message in italic', () => {
			expect(listItemInstance.props.children.type).to.equal('i');
		});
		it('should have a delete icon on the right', () => {
			expect(listItemInstance.props.rightAddon.type).to.equal(DeleteSVGIcon);
		});
		it('should act on a click on the delete icon', () => {
			expect(listItemInstance.props.rightAddon.props.onClick).to.exist;
		});
		it('should have a lock icon on the left', () => {
			expect(listItemInstance.props.leftAddon.type).to.equal(LockSVGIcon);
		});
		describe('click on the delete icon', () => {
			beforeEach(() => {
				listItemInstance.props.rightAddon.props.onClick();
			});
			it('should call onDelete function', () => {
				expect(onDeleteFake).to.have.been.calledOnce;
			});
		});
	});
});
