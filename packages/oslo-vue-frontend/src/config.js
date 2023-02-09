require('dotenv').config();
//
//
//*
// import dotenv from 'dotenv';
// dotenv.config({path:'/.env'});

var env = process.env.VUE_APP_TARGET_ENV || 'local'

var config = {
  local: require('../config/local.js'),
  dev: require('../config/development.js'),
  prod: require('../config/production.js'),
  test: require('../config/staging.js')
}

//console.log(env)
//console.log(process.env.VUE_APP_TARGET_ENV)

module.exports = config[env];
