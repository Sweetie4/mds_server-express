import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User.js';import { sequelize } from '../core/connexion_database';

export class Profile extends Model {
  label;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    label: {
      type: DataTypes.STRING(25),
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName:'profile',
    sequelize, 
    modelName: 'Profile',
  },
);

