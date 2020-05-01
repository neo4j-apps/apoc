/* global cy, context, it */
context('Search', () => {

    it('should load TOC', () => {
        cy.visit('/')

        cy.wait(1000)

        cy.get('.chapter').should('have.length', 22)
    })

    it('should filter TOC', () => {
        cy.visit('/')

        cy.wait(1000)

        // No filtering
        cy.get('.chapter').should('have.length', 22)

        // Filter
        cy.get('.search input').type('export')
        cy.get('.chapter').should('have.length', 1)

        // Escape to clear
        cy.get('.search input').type('{esc}')
        cy.get('.chapter').should('have.length', 22)
    })

    it('should load docs from sidebar', () => {
        cy.visit('/')

        cy.get('.chapter').find('a').first()
        .click().invoke('text').then(text => {
            cy.get('.main').contains(text.trim())
        })
    })

    it('should fix links to pages in .main', () => {
        cy.visit('/')
        // cy.get('.search input').type('json')

        cy.get('.main').find('a[href$=".html"]').last().click()
        cy.wait(400)


        cy.get('.main').find('a[href$=".html"]').last().click()
        cy.wait(400)

        cy.get('.main').should('not.be.empty')
    })

    it('should not have any dead links', () => {
        cy.visit('/')

        return cy.get('.chapter').find('li a').each(async el => {
            await cy.wrap(el).click()
            await cy.wait(100)
            await cy.get('.main').should('not.be.empty')

            await cy.get('.main')
                .then(async $main => {
                    const links = Array.from($main.find('a[href*=".html"]').not('[href*="//"]'))

                    for ( let i = 0; i < links.length; i++) {
                        await cy.wrap($main.find('a[href*=".html"]').not('[href*="//"]').get(i))
                            .then(a => a.click())
                            .then(() => cy.wait(100))
                            .then(() => cy.get('.main').should('not.be.empty'))
                            .then(() => cy.go('back'))
                            .then(() => cy.wait(100))
                    }
                })
        })
    })

})