import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class Criter extends Model {
  label;
}

Criter.init(
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
    type : {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    possible_values: {
      type: DataTypes.JSON,
      allowNull:true
    }
  },
  {
    timestamps: false,
    tableName:'criter',
    schema: 'b2c',
    sequelize, 
    modelName: 'Criter',
  },
);
