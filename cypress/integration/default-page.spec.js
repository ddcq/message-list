context('Add a message', () => {
	const messages = [];
	beforeEach(() => {
		cy.visit('/');
		cy.server()
			.route('DELETE', 'https://msglist.getsandbox.com:443/messages', () => {
				messages.length = 0; // remove all messages
				return messages;
			})
			.as('delete-messages');
		cy.server()
			.route('POST', 'https://msglist.getsandbox.com:443/messages', (message) => {
				messages.push(message);
				return messages;
			})
			.as('add-message');
		cy.get('#mli-delete-all-btn').click().wait('@delete-messages');
	});

	it('add message', () => {
		// cy.server()
		// 	.route('GET', 'https://msglist.getsandbox.com:443/messages', 'fixture:messages-response.json')
		// 	.as('fetch-messages');
		cy.get('#mli-add-meddage-btn').click()

		cy.location('pathname').should('eq', '/message-create');

		cy.get('#mc-text').type('Lorem ipsum');
		cy.get('#mc-submit-btn').click().wait('@add-message')

		cy.location('pathname').should('eq', '/');
		cy.get('#message-item-1').contains('Lorem ipsum');
	});
});
