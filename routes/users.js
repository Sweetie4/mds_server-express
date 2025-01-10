import { Router } from 'express';
import { User } from '../models/User.js';
import { sequelize } from '../core/connexion_database.js';
export let router = Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try{
    await User.create(req.body);
    res.json({"success":"L'utilisateur a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/role/:role', async function(req, res, next) {
  try{
    let id = req.url.split('/')[2];
    const users = await User.findAll({ where: { id_profile:id } });
    res.json(users);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.url.split('/')[1]
    const users = await User.findOne({ where: { id } });
    res.json(users);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id = req.url.split('/')[1]
    await User.update(
    req.body,
    {
      where: {
        id: id,
      },
    },
  );
  res.json({"success":"L'utilisateur a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let id = req.url.split('/')[1]
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.json({"success":"L'utilisateur a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});
