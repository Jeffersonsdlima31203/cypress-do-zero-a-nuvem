/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário com sucesso', () => {
    const longText = Cypress._.repeat('abcdefgijklmnopqrstuvxz', 10)

    cy.get('#firstName').type('Jefferson')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('jeffersonsdlima@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um e-mail inválido', () => {
    cy.get('#firstName').type('Jefferson')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('jeffersonsdlima@gmail,com')
    cy.get('#open-text-area').type('Testando envio com e-mail inválido')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Jefferson')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('jeffersonsdlima@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gael')
      .should('have.value', 'Gael')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Lima')
      .should('have.value', 'Lima')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('jeffersonsdlima@gmail.com')
      .should('have.value', 'jeffersonsdlima@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('16991044678')
      .should('have.value', '16991044678')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Pudim',
      lastName: 'Bulldog',
      email: 'jeffpaydev@gmail.com',
      text: 'Teste.'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/ArquivoEnvio (5).json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('ArquivoEnvio (5).json')
      })
  })

  it('Seleciona um arquivo da pasta fixtures com ação de drag-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/ArquivoEnvio (5).json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('ArquivoEnvio (5).json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture com alias', () => {
    cy.fixture('ArquivoEnvio (5).json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('ArquivoEnvio (5).json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem necessidade de clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a política de privacidade removendo o target e clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})
