/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() =>  {
        cy.visit('http://localhost:3000/login');
        cy.viewport(414, 896);
    })

    it('displays the name of the app', () => {
        cy.get('h1')
            .should('have.text', 'MUNCHIES')
            .should('be.visible')
    })

    it('displays the name of the page', () => {
        cy.get('h2')
            .should('have.text', 'Log in')
            .should('be.visible')
    })

    it('displays a google account button', () => {
        cy.get('#google-btn')
            .should('contain.text', 'Use Google Account')
    })

    it('displays a login form with email and password input', () => {
        cy.get('#login-form')
            .should('exist')
        cy.contains('label', 'Email', {matchCase: true})
        cy.contains('label', 'Password', {matchCase: true})
        cy.get('input[type="email"]')
            .should('exist')
            .invoke('attr', 'placeholder')
            .should('contain', 'eg. email@email.com');
        cy.get('input[type="password"]')
            .should('exist')
            .invoke('attr', 'placeholder')
            .should('contain', '*******');
    })

    it('displays a link to "Forgot Password" page', () => {
        cy.get('a')
            .should('exist')
            .should('be.visible')
            .should('contain.text', 'Forgot Password?', { matchCase: true })
    })

    it('enters wrong email - throws error', () => {
        cy.get('#login-form')
            .find('input[type="email"]').type('m.mullerjnr@gmail.com')
        cy.get('#login-form')
            .find('input[type="password"]').type('Tester@123')
        cy.get('#login-form')
            .find('button')
            .click()
        cy.get('#login-form')
            .should('contain', 'That email is not registered')
            .find('input[type="email"]').clear()
        cy.get('#login-form')
            .find('input[type="password"]').clear()
    })

    it('enters wrong password - throws error', () => {
        cy.get('#login-form')
            .find('input[type="email"]').type('b.mullerjnr@gmail.com')
        cy.get('#login-form')
            .find('input[type="password"]').type('Testeeer@123')
        cy.get('#login-form')
            .find('#login-btn')
            .click()
        cy.get('#login-form')
            .should('contain', 'Password incorrect')
            .find('input[type="email"]').clear()
        cy.get('#login-form')
            .find('input[type="password"]').clear()
    })

    it('enters correct credentials - logs in', () => {
        cy.get('#login-form')
            .find('input[type="email"]').type('b.mullerjnr@gmail.com')
        cy.get('#login-form')
            .find('input[type="password"]').type('Tester@123')
        cy.get('#login-form')
            .find('#login-btn')
            .click()
        cy.location('pathname', {timeout: 100000}).should('eq', '/meals')
    })

    it('saves JWT-token in cookie', () => {

    })

    
})

// it('.submit() - submit a #login-form', () => {
//     // https://on.cypress.io/submit
//     cy.get('.action-#login-form')
//       .find('[type="text"]').type('HALFOFF')

//     cy.get('.action-#login-form').submit()
//       .next().should('contain', 'Your #login-form has been submitted!')
//   })