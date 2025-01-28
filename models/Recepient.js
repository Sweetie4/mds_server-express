import { Sequelize, DataTypes, Model } from 'sequelize';
import { Message } from './Message.js';
import { User } from './User.js';
const sequelize = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa');

export class Recepient extends Model {
  id_message;
  id_recepient;
}

Recepient.init(
  {
    id_message: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Message,
        key: 'id'
      },
    },
    id_recipient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { 
        model: User,
        key: 'id'
      },
    },
  },
  {
    timestamps: false,
    tableName:'recepient',
    schema:'b2b',
    sequelize, 
    modelName: 'Recepient',
  },
);
