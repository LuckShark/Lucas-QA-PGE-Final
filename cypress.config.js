const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api-pge-lucas.onrender.com',
    responseTimeout: 60000,
  },
});