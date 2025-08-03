/// <reference types="cypress" />

describe('Cadastro - /contribuintes', () => {
  let cpfValido;

  before(() => cy.warmUpApi());

  beforeEach(() => {
    cpfValido = Math.random().toString().slice(2, 13);

    return cy.fixture('pge-users').then((users) => {
      return cy.login(users.loginValido.usuario, users.loginValido.senha);
    });
  });

  const gerarContribuinte = (overrides = {}) => ({
    cpf: cpfValido,
    nome: 'Clark Kent',
    data_nascimento: '1938-06-01',
    nome_mae: 'Martha Kent',
    ...overrides,
  });

  it('CT04 - deve cadastrar com sucesso um contribuinte válido', () => {
    const body = gerarContribuinte();
    cy.cadastrarContribuinte(body).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('mensagem', 'Contribuinte cadastrado com sucesso');
    });
  });

  it('CT05 - deve falhar com CPF inválido', () => {
    const body = gerarContribuinte({ cpf: '123' });
    cy.request({
      method: 'POST',
      url: '/contribuintes',
      headers: { 'x-access-token': Cypress.env('accessToken') },
      body,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('erro', 'CPF inválido');
    });
  });

  it('CT06 - deve falhar com campo obrigatório ausente', () => {
    const body = gerarContribuinte();
    delete body.nome_mae;
    cy.request({
      method: 'POST',
      url: '/contribuintes',
      headers: { 'x-access-token': Cypress.env('accessToken') },
      body,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('erro', 'Todos os campos obrigatórios devem ser preenchidos');
    });
  });

  it('CT07 - deve falhar com CPF duplicado', () => {
    const body = gerarContribuinte();
    cy.cadastrarContribuinte(body);
    cy.request({
      method: 'POST',
      url: '/contribuintes',
      headers: { 'x-access-token': Cypress.env('accessToken') },
      body,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('erro', 'CPF já cadastrado');
    });
  });

  it('CT08 - deve falhar sem autenticação', () => {
    const body = gerarContribuinte();
    cy.request({
      method: 'POST',
      url: '/contribuintes',
      body,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(403);
      expect(res.body).to.have.property('erro', 'Token não fornecido');
    });
  });
});
