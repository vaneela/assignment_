const express = require('express');
const { RegisterHandler, LoginHandler } = require('../controllers/AuthController');

const AuthRoute = express.Router();

AuthRoute.post('/register',RegisterHandler);
AuthRoute.post('/login',LoginHandler);

module.exports = AuthRoute
