import { Router } from 'express';
import { User } from '../models/User.js';
import { sequelize } from '../core/connexion_database.js';
export let router = Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('save a user');
});

router.get('/role/:role', function(req, res, next) {
  res.send('get users by role');
});

router.get('/:id', async function(req, res, next) {
  res.send('get user by id');
  // const jane = await User.create({
  //   username: 'janedoe',
  //   birthday: new Date(1980, 6, 20),
  // });
  
  // const users = await User.findAll();
  // res.send(users);
});

router.put('/:id', function(req, res, next) {
  res.send('update user by id');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete user by id');
});
