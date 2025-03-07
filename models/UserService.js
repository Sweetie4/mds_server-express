import { Sequelize, DataTypes, Model } from 'sequelize';
import { Service } from './Service.js';
import { User } from './User.js';
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

export class UserService extends Model {
  id_user;
  id_service;
  scheduled_on;
}

UserService.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      },
    },
    id_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { 
        model: Service,
        key: 'id'
      },
    },
    scheduled_on: {
      type: DataTypes.DATE,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'user_service',
    schema:'b2c',
    sequelize, 
    modelName: 'UserService',
  },
);
