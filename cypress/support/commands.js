// cypress/support/commands.js

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Karolyne',
    lastName: 'Lima',
    email: 'karolyne_lima@gmail.com',
    text: 'Test.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})
