import { Sequelize, DataTypes, Model } from 'sequelize';
import { Profile } from './Profile.js';
import bcrypt from 'bcrypt-nodejs';
import { generateAccessToken } from '../app.js';
const sequelize = new Sequelize('mssql://sa:sqlPASSWORD123456@localhost:40110/gpa');

export class User extends Model {
  id_profile;
  id_commercial;
  first_name;
  last_name;
  login;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    id_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: Profile,
      key: 'id',
      },
    },
    id_commercial: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }, 
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password_hashed: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'users',
    sequelize, 
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
       if (user.password_hashed) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password_hashed = bcrypt.hashSync(user.password_hashed, salt);
       }
      },
  }
  },
);
User.authenticate = async function(username, password) {

  const user = await User.findOne({ where: { login:username } });

  // bcrypt is a one-way hashing algorithm that allows us to 
  // store strings on the database rather than the raw
  // passwords. Check out the docs for more detail
  if (bcrypt.compareSync(password, user.password_hashed)) {
    return user.authorize();
  }

  return {'error':'invalid password'};
}

User.prototype.authorize =  function () {
  const user = this
  const authToken = generateAccessToken(user.login);

  return { user, authToken }
};
