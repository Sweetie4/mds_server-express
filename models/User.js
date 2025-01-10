import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class User extends Model {
  firstName;
  lastName;
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
      allowNull: false
      // references: {}, --to add : foreign keys
    },
    id_commercial: {
      type: DataTypes.INTEGER,
      // references: {}, --to add : foreign keys
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