import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const User = sequelize.define('User', {
  login: DataTypes.STRING,
  password:DataTypes.STRING 
});