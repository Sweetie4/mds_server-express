import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

export const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'MAHORA',
  port: 1433,
  database: 'gpa',
  encrypt: false,
  authentication: {
    type: 'default',
    options: {
      userName: 'tp_access',
      password: 'safemdp',
    },
  },
});