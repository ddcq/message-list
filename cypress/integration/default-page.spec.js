context('Add a message', () => {
	const messages = [];
	beforeEach(() => {
		cy.visit('/');
		cy.location('pathname').should('eq', '/'); // No redirection
		cy.get('#mli-delete-all-btn').click(); // Delete all messages
		cy.get('#mli-empty-list').contains('Aucun message');
	});

	it('add message', () => {
		cy.get('#mli-create-message-btn').click();

		cy.location('pathname').should('eq', '/message-create');

		const testMessage = 'Cypress test message';
		cy.get('#mc-text').type(testMessage);
		cy.get('#mc-submit-btn').click();

		cy.location('pathname').should('eq', '/');
		cy.get('#message-item-1').contains(testMessage);
	});
});
