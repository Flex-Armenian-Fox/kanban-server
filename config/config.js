module.exports = {
  "development": {
    "username": process.env.DEV_USERNAME,
    "password": process.env.DEV_PASSWORD,
    "database": process.env.DEV_DB,
    "host": process.env.DEV_SERVER,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
