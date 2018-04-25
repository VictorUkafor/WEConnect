const dbConfig = {
  development: {
    username: 'postgres',
    password: 'success4me',
    database: 'WeconnectDev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    secret: '£EwrqBB$5!@888*><;'
  },
  test: {
    username: 'postgres',
    password: 'success4me',
    database: 'WeconnectTest',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    secret: '£EwrqBB$5!@888*><;'
  },
  production: {
    username: 'postgres',
    password: 'success4me',
    database: 'WeconnectPro',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    secret: '£EwrqBB$5!@888*><;'
  }
};

module.exports = dbConfig;
