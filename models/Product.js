import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

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
      // references: {}, --to add : foreign keys
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
