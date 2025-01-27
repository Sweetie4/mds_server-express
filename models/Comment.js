import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User.js';
import { Product } from './Product.js';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class Comment extends Model {
  label;
  duration;
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
