/// <reference types="cypress" />

describe('Login - /login', () => {

  before(() => cy.warmUpApi());

  beforeEach(function () {
    cy.fixture('pge-users').then((users) => {
      this.users = users;
    });
  });

  it('CT01 - deve retornar 200 e token válido com login correto', function () {
    cy.login(this.users.loginValido.usuario, this.users.loginValido.senha)
      .then(() => {
        const token = Cypress.env('accessToken');
        expect(token).to.be.a('string').and.not.be.empty;
      });
  });

  it('CT02 - deve retornar 400 com senha incorreta e mensagem de erro', function () {
    cy.request({
      method: 'POST',
      url: '/login',
      body: this.users.loginInvalido,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('erro', 'Usuário ou senha inválidos');
    });
  });

  it('CT03 - deve retornar 400 com campos vazios e mensagem de erro', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: { usuario: '', senha: '' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('erro', 'Usuário ou senha inválidos');
    });
  });
});
