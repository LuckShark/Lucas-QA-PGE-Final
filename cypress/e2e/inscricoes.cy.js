/// <reference types="cypress" />

describe('Consulta de Inscrições - /inscricoes/:cpf', () => {
  const cpfComInscricoes = '12345678900';
  const cpfSemInscricoes = Math.random().toString().slice(2, 13);

  before(() => cy.warmUpApi());

  beforeEach(() => {
    return cy.fixture('pge-users').then((users) => {
      return cy.login(users.loginValido.usuario, users.loginValido.senha);
    });
  });

  it('CT09 - deve retornar inscrições existentes com sucesso', () => {
    cy.consultarInscricoes(cpfComInscricoes).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;
    });
  });

  it('CT10 - deve retornar 404 para CPF válido sem inscrições', () => {
    cy.request({
      method: 'GET',
      url: `/inscricoes/${cpfSemInscricoes}`,
      headers: { 'x-access-token': Cypress.env('accessToken') },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('erro', 'Nenhuma inscrição encontrada para o CPF fornecido');
    });
  });

  it('CT11 - deve falhar sem autenticação', () => {
    cy.request({
      method: 'GET',
      url: `/inscricoes/${cpfComInscricoes}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(403);
      expect(res.body).to.have.property('erro', 'Token não fornecido');
    });
  });
});
