import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User.js';
import { Delivery } from './Delivery.js';
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

export class Order extends Model {
  id_delivery;
  id_client;
  id_deliveror;
  delivery_address;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_delivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Delivery,
        key: 'id'
      },
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: User,
        key: 'id'
      },
    },
    id_deliveror: {
      type: DataTypes.INTEGER,
      references: { 
        model: User,
        key: 'id'
      },
    },
    delivery_address: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName:'orders',
    sequelize, 
    modelName: 'Order',
  },
);
