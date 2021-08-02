const Express = require('express');
const Router = Express.Router();

const CheckAuth = require('../utils/CheckAuth');
const Render = require('../utils/Render');

Router.get('/', async (request, response) => {
  Render(response, request, 'company.ejs');
});

module.exports = Router;
