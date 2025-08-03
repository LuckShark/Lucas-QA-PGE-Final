
# Teste Técnico - QA Automatizador Pleno - PGE-CE

Este repositório contém a entrega completa do teste técnico para a vaga de Analista de Testes QA Pleno da Procuradoria Geral do Estado do Ceará (PGE-CE).  

> A API oficial disponibilizada pela PGE estava fora do ar durante o período de execução do teste.  
> Para garantir a entrega e manter a fidelidade técnica do desafio, desenvolvi uma API própria com comportamento equivalente, simulando os endpoints esperados pela API original (login, cadastro de contribuintes e consulta de inscrições).  
> Toda a estrutura foi mantida como se estivesse consumindo a API real da PGE, permitindo que os testes, a documentação e a automação fossem representativos e realistas. 

---

## Estrutura do Projeto

```
📁 cypress
│   ├── e2e
│   │   ├── login.cy.js                             # Testes autenticação
│   │   ├── constribuintes.cy.js                    # Testes de cadastro de contribuintes
│   │   └── inscricoes.cy.js                        # Testes de consulta de inscrições
│   ├── fixtures
│   │   └── pge-users.json                          # Massa de dados com usuários válidos e inválidos
│   └── support
│       └── commands.js                             # Custom command para login, cadastro, etc
│
📁 postman
│   └── API-LucasQA PGE.postman_collection.json      # Coleção de testes manuais
│
📁 docs
│   ├── 📄 Plano de Testes - Lucas QA PGE.pdf    
│   ├── 📄 Caderno de Testes - Lucas QA PGE.pdf 
│   └── 📄 Melhorias - Lucas QA PGE.pdf

```

## Itens Entregues

1. Plano de testes
- Documento completo com estratégia, escopo, cronograma, riscos e ferramentas.

2. Caderno de testes
- Casos de testes organizados por funcionalidade (login, cadastro, consulta).

3. Testes no Postman
- Coleção de requisições com token dinâmico, scripts de verificação e cobertura dos endpoints principais.

4. Testes Automatizados
- Implementados com Cypress, utilizando token JWT e organização por fixtures. 

5. Relatório de Melhorias
- Documento contendo sugestões reais de aprimoramento da API e da estratégia de QA.
---

## Tecnologias Utilizadas

- **Cypress**: Automação de testes de API com suporte a tokens dinâmicos, `fixtures`, `commands` e organização modular.
- **Postman**: Testes manuais de API, scripts de pré-requisição e verificação, uso de variáveis de ambiente.
- **JavaScript (ES6+)**: Lógica dos testes.
- **Word**: Documentação técnica (plano, casos e relatório de melhorias).
- **API Própria do autor**: Criada exclusivamente para este desafio, replicando o comportamento esperado da API da PGE.

---

## Execução dos Testes Cypress

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute os testes:
   ```bash
   npx cypress run
   ```


---

## Sobre a Autenticação

A API simulada criada para este projeto utiliza autenticação via token JWT. 
O processo de login é realizado por meio de uma requisição `POST /login`, e o token retornado é armazenado com `Cypress.env()`  para ser reutilizado nos endpoints protegidos. 
Foi criado um comando customizado `cy.login()` que centraliza essa lógica e permite reaproveitamento em toda a suíte. 
Outros comandos customizados também foram implementados para cadastro e consulta.

---

## Considerações Finais

Mesmo sem acesso à API real da PGE-CE, mantive todos os critérios técnicos do desafio e garanti uma entrega realista. <br>
Desenvolvi uma API própria, permitindo a criação de um ambiente de testes completo e compatível com o cenário original, incluindo:

- Fluxos positivos e negativos.
- Cobertura dos endpoints de login, cadastro e consulta.
- Automatização com boas práticas (sem uso de `cy.wait()`, uso de fixtures, tokens dinâmicos etc).
- Documentação clara e rastreável.
- De bônus, os testes foram integrados a uma pipe no Actions, enviando notificações automatizadas para o Discord.

Estou disponível para apresentar as evidências de execução e responder dúvidas sobre qualquer parte da entrega.

---

**Autor:** Lucas Araújo de Almeida  
**Data da entrega:** 03/08/2025
