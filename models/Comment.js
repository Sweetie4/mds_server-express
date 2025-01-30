import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User.js';
import { Product } from './Product.js';import { sequelize } from '../core/connexion_database';

export class Comment extends Model {
  id_user;
  id_product;
  content;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: User,
        key:'id'
      }
    },
    id_product : {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: Product,
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'comments',
    schema: 'b2c',
    sequelize, 
    modelName: 'Comment',
  },
);
