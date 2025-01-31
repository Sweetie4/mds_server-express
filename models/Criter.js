import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('mssql://sa:msqlPASSWORD123456@localhost:40110/gpa');

export class Criter extends Model {
  label;
  type;
  possible_values;
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
