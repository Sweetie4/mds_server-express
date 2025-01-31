import { Sequelize, DataTypes, Model } from 'sequelize';
import {User} from './User.js'
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

export class Message extends Model {
  id_sender;
  content;
  send_on
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: User,
        key: 'id'
      }
    },
    content:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    send_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: false,
    tableName:'message',
    schema: 'b2b',
    sequelize, 
    modelName: 'Message',
  },
);
