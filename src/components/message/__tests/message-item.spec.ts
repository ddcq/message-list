import { expect } from 'chai';
import register from "ignore-styles";
import React from 'react';
import * as renderer from "react-test-renderer";
import { VISIBILITY } from '../../../types';
import MessageItem, { MessageItemProps } from '../message-item';

register(['.sass', '.scss'])

describe("components/message/message-item", () => {
	/*
	let renderer;
	const MyElement = Container;
	beforeEach(() => {
		renderer = (props = {}) => {
			const shallowRenderer = ShallowRenderer.createRenderer();
			const actualProps = {
				...props
			};
			shallowRenderer.render(Element);
			return shallowRenderer;
		};
	});

	afterEach(() => {
		renderer = undefined;
	});
*/
	it("SubjectToBeTested renders correctly", () => {
		const props: MessageItemProps = {
			message: { text: "test", visibility: VISIBILITY.PUBLIC },
			onDelete: () => { }
		};
		const tree = renderer
			.create(React.createElement(MessageItem, props))
			.toTree();
		expect(tree).to.deep.nested.include({});
	});
});
