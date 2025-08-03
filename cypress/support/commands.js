Cypress.Commands.add('warmUpApi', () => {
  cy.request({
    method: 'GET',
    url: '/',
    failOnStatusCode: false, 
  });
});

Cypress.Commands.add('login', (usuario, senha) => {
  cy.request({
    method: 'POST',
    url: '/login',
    body: { usuario, senha },
  }).then((response) => {
    Cypress.env('accessToken', response.body.token);
  });
});

Cypress.Commands.add('cadastrarContribuinte', (contribuinte) => {
  return cy.request({
    method: 'POST',
    url: '/contribuintes',
    headers: { 'x-access-token': Cypress.env('accessToken') },
    body: contribuinte,
  });
});

Cypress.Commands.add('consultarInscricoes', (cpf) => {
  return cy.request({
    method: 'GET',
    url: `/inscricoes/${cpf}`,
    headers: { 'x-access-token': Cypress.env('accessToken') },
  });
});
