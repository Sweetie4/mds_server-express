import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

export const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'localhost',
  port: 40110,
  database: 'master',
  encrypt: false,
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'msqlPASSWORD123456',
    },
  },
});
