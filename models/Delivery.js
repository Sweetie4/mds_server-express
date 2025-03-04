import { Sequelize, DataTypes, Model } from 'sequelize';
import {User} from './User.js'
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

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
