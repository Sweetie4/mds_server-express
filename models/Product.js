import { Sequelize, DataTypes, Model } from 'sequelize';
import { Category } from './Category.js';import { sequelize } from '../core/connexion_database.js';

export class Product extends Model {
  id_category;
  price;
  stock;
  label;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_category: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id'
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName:'product',
    sequelize, 
    modelName: 'Product',
  },
);
