import { Sequelize, DataTypes, Model } from 'sequelize';
import { Profile } from './Profile.js';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class User extends Model {
  id_profile;
  id_commercial;
  first_name;
  last_name;
  login;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: Profile,
      key: 'id',
      },
    },
    id_commercial: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }, 
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'users',
    sequelize, 
    modelName: 'User',
  },
);
