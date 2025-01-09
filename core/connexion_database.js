import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

export const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'MAHORA\\hjp',
  port: 1433,
  database: 'gpa',
  authentication: {
    type: 'default',
    options: {
      userName: 'tp',
      password: 'safemdp',
    },
  },
});
