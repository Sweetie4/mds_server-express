import { Sequelize, DataTypes, Model } from 'sequelize';
import {User} from './User.js'import { sequelize } from '../core/connexion_database';

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
