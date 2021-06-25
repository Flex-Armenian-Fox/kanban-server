require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.DEV_USERNAME,
    "password": process.env.DEV_PASSWORD,
    "database": process.env.DEV_DB,
    "host": process.env.DEV_SERVER,
    "dialect": "postgres"
  },
  "production": {
    "config.use_env_variable": "DATABASE_URL"
  }
}
