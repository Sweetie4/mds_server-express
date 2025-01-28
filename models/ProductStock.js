import { Sequelize, DataTypes, Model } from 'sequelize';
import { Criter } from './Criter.js';
import { Product } from './Product.js';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class ProductStock extends Model {
  id_product;
  id_stock;
  added_quantity;
  reception_date;
}

ProductStock.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Product,
        key: 'id'
      },
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { 
        model: Criter,
        key: 'id'
      },
    },
    added_quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reception_date:{
      type: DataTypes.DATE,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'product_stock',
    schema:'b2b',
    sequelize, 
    modelName: 'ProductStock',
  },
);
