import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

export const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: process.env.SERVER,
  port: process.env.PORT,
  database: process.env.DATABASE,
  encrypt: false,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  },
});