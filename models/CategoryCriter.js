import { Sequelize, DataTypes, Model } from 'sequelize';
import { Category } from './Category.js';
import { Criter } from './Criter.js';
const sequelize = new Sequelize('mssql://sa:msqlPASSWORD123456@localhost:40110/gpa');

export class CategoryCriter extends Model {
  id_category;
  id_criter;
}

CategoryCriter.init(
  {
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Category,
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
    tableName:'category_criter',
    schema:'b2c',
    sequelize, 
    modelName: 'CategoryCriter',
  },
);
