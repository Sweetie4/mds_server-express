import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

export class Service extends Model {
  label;
  duration;
}

Service.init(
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
    duration : {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName:'service',
    schema: 'b2c',
    sequelize, 
    modelName: 'Service',
  },
);
