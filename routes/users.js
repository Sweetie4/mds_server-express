import { Router } from 'express';
import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { Service } from '../models/Service.js';
import { UserService } from '../models/UserService.js';
export let router = Router();

router.post('/', async function(req, res, next) {
  try{
    await User.create(
      {
        first_name:req.body.first_name, 
        last_name: req.body.last_name, 
        login:req.body.login, 
        password_hashed: req.body.password,
        id_profile: req.body.id_profile,
        id_comercial: req.body.id_comercial??null
      });
    res.json({"success":"L'utilisateur a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/role/:role', async function(req, res, next) {
  try{
    let id = req.params.role;
    const users = await User.findAll({ 
      where: { 
        id_profile:id 
      },
      include:[
        {model: Profile}
      ]
    })
    res.json(users);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id
    const users = await User.findOne({ where: { id },
      include:[
        {model: Profile},
        'Commercial'
      ] });
    res.json(users);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id
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
    let id =  req.params.id
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

/* User Relationships */

User.belongsTo(User,{
  foreignKey:'id_commercial',
  as:'Commercial'
})

User.belongsTo(Profile,{
  foreignKey:'id_profile'
});
Profile.hasMany(User, {
  foreignKey: 'id_profile'
})

User.belongsToMany(Service,{
  through:UserService,
  foreignKey:'id_user',
  otherKey:'id_service'
})