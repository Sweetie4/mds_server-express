import { Router } from 'express';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';

export let router = Router();

router.post('/', async function(req, res, next) {
  try{
    await Order.create(req.body);
    res.json({"success":"La commande a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    const order = await Order.findOne({where: { id },include: ['Client', 'Deliveror'] })
    res.json(order);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/', async function(req, res, next) {
  try{
    const orders = await Order.findAll({ 
          include: ['Client', 'Deliveror']
        });
    res.json(orders);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    await Order.update(
    req.body,
    {
      where: {
        id: id,
      },
    },
  );
  res.json({"success":"La commande a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id;
    await Order.destroy({
      where: { id: id }
    });
    
    res.json({"success":"La commande a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/* Order Relationships */
Order.belongsTo(User,{
  as: 'Client',
  foreignKey:'id_client'
});
User.hasMany(Order, {
  as: 'Client',
  foreignKey: 'id_client'
})
Order.belongsTo(User,{
  as: 'Deliveror',
  foreignKey:'id_deliveror'
});
User.hasMany(Order, {
  as: 'Deliveror',
  foreignKey: 'id_deliveror'
})