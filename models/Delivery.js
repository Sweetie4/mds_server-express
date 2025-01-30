import { Sequelize, DataTypes, Model } from 'sequelize';
import {User} from './User.js'import { sequelize } from '../core/connexion_database';

export class Delivery extends Model {
  id_deliveror;
  id_responsable;
  departure;
}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_deliveror: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    id_responsable : {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: User,
        key: 'id'
      }
    },
    departure: {
      type: DataTypes.DATE,
      allowNull:true
    }
  },
  {
    timestamps: false,
    tableName:'delivery',
    schema: 'delivery',
    sequelize, 
    modelName: 'Delivery',
  },
);
