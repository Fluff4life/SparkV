const parser = require('body-parser');
const express = require('express');

const router = express.Router();

const CheckAuth = require('../../utils/CheckAuth');
const Render = require('../../utils/Render');

router.use(parser.json({ limit: '10mb' }));

router.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

router.use('/avatar', require('./avatar'));
router.use('/login', require('./login'));
router.use('/status', require('./status'));
router.use('/avatar', require('./avatar'));
router.use('/auth', require('./auth'));
router.use('/userdata', require('./userdata'));
router.use('/logout', require('./logout'));

module.exports = router;
