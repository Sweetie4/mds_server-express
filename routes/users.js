import { Router } from 'express';
import { User } from '../models/User.js';
import { sequelize } from '../core/connexion_database.js';
export let router = Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('save a user');
});

router.get('/role/:role', async function(req, res, next) {
  try{
    let id = req.url.split('/')[2];
    const users = await User.findAll({ where: { id_profile:id } });
    res.send(JSON.stringify(users, null, 2));
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.url.split('/')[1]
    const users = await User.findOne({ where: { id } });
    res.send(JSON.stringify(users, null, 2));
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', function(req, res, next) {
  res.send('update user by id');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete user by id');
});
