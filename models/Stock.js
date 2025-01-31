import { Sequelize, DataTypes, Model } from 'sequelize';
import {User} from './User.js'
const sequelize = new Sequelize('mssql://sa:msqlPASSWORD123456@localhost:40110/gpa');

export class Stock extends Model {
  id_supplier;
  quantity;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: User,
        key: 'id'
      }
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'stock',
    schema: 'b2b',
    sequelize, 
    modelName: 'Stock',
  },
);
