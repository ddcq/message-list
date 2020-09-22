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
		cy.get('#mi-delete-icon').should('exist');
	});

	it('add private message', () => {
		cy.get('#mli-create-message-btn').click();

		cy.location('pathname').should('eq', '/message-create');

		const testMessage = 'Cypress test message';
		cy.get('#mc-text').type(testMessage);
		cy.get('#mc-private-chk').click();
		cy.get('#mc-submit-btn').click();

		cy.location('pathname').should('eq', '/');
		cy.get('#message-item-1').find('i').contains(testMessage);
		cy.get('#mi-delete-icon').should('exist');
		cy.get('#mi-lock-icon').should('exist');
	});
	it('back to list', () => {
		cy.get('#mli-create-message-btn').click();

		cy.location('pathname').should('eq', '/message-create');

		const testMessage = 'Cypress test message';
		cy.get('#mc-text').type(testMessage);
		cy.get('#mc-private-chk').click();
		cy.get('#mc-back-btn').click();

		cy.location('pathname').should('eq', '/');
		cy.get('#message-item-1').should('not.exist');
		cy.get('#mli-empty-list').should('exist');
	});
});
