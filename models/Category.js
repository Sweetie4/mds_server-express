import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../core/connexion_database';

export class Category extends Model {
  label;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    label: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'category',
    schema: 'b2c',
    sequelize, 
    modelName: 'Category',
  },
);
