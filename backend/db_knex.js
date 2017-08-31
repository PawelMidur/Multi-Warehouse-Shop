var config      = require('./db_config_mysql');  
var env         = 'development';  
var knex        = require('knex')(config[env]);

module.exports = knex;