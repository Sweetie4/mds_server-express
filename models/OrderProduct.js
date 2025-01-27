import { Sequelize, DataTypes, Model } from 'sequelize';
import { Product } from './Product.js';
import { Order } from './Order.js';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class OrderProduct extends Model {
  id_order;
  id_product;
}

OrderProduct.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Order,
        key: 'id'
      },
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { 
        model: Product,
        key: 'id'
      },
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'order_product',
    sequelize, 
    modelName: 'OrderProduct',
  },
);
