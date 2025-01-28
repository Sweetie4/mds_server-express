import { Router } from 'express';
import { Message } from '../models/Message.js';
import { Recepient } from '../models/Recepient.js';
import { User } from '../models/User.js';

export let router = Router();

router.post('/', async function(req, res, next) {
  try{
    await Message.create(req.body);
    res.json({"success":"Le message a bien été envoyé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    const message = await Message.findOne({where: { id },include: [ 'Sender', {model: User,through: { attributes: [] }}] })
    res.json(message);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/', async function(req, res, next) {
  try{
    const messages = await Message.findAll({ 
          include: ['Sender',  {model: User,through: { attributes: [] }}]
        });
    res.json(messages);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    await Message.update(
    req.body,
    {
      where: {
        id: id,
      },
    },
  );
  res.json({"success":"Le message a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id;
    await Message.destroy({
      where: { id: id }
    });
    
    res.json({"success":"Le message a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/* Order Relationships */
Message.belongsTo(User,{
  as: 'Sender',
  foreignKey:'id_sender'
});
User.hasMany(Message, {
  as: 'Sender',
  foreignKey: 'id_sender'
})
Message.belongsToMany(User, {
  through: Recepient,
  foreignKey: 'id_message',   
  otherKey: 'id_recipient',   
});
