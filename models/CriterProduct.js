import { Sequelize, DataTypes, Model } from 'sequelize';
import { Criter } from './Criter.js';
import { Product } from './Product.js';import { sequelize } from '../core/connexion_database';

export class CriterProduct extends Model {
  id_product;
  id_criter;
}

CriterProduct.init(
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
    id_criter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { 
        model: Criter,
        key: 'id'
      },
    }
  },
  {
    timestamps: false,
    tableName:'criter_product',
    schema:'b2c',
    sequelize, 
    modelName: 'CriterProduct',
  },
);
