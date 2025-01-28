import { Router } from 'express';
import { Delivery } from '../models/Delivery.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

export let router = Router();

router.post('/', async function(req, res, next) {
  try{
    await Delivery.create(req.body);
    res.json({"success":"La livraison a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    const delivery = await Delivery.findOne(
      {
        where: { id },
        include:  [ 
          'Responsable', 
          'DeliveryMan', 
          {
            model: Order, 
            include: {
              model: Product,
              through: { attributes: ['quantity'] }
            }
          }
        ] 
      }
    )
    res.json(delivery);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/', async function(req, res, next) {
  try{
    const deliveries = await Delivery.findAll({ 
          include: [ 
            'Responsable', 
            'DeliveryMan', 
            {
              model: Order, 
              include: {
                model: Product,
                through: { attributes: ['quantity'] }
              }
            }
          ]
        });
    res.json(deliveries);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    await Delivery.update(
    req.body,
    {
      where: {
        id: id,
      },
    },
  );
  res.json({"success":"La livraison a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id;
    await Delivery.destroy({
      where: { id: id }
    });
    
    res.json({"success":"La livraison a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/* Delivery Relationships */
Delivery.belongsTo(User,{
  as: 'Responsable',
  foreignKey:'id_responsable'
});
User.hasMany(Delivery, {
  as: 'Responsable',
  foreignKey: 'id_responsable'
})
Delivery.belongsTo(User,{
  as: 'DeliveryMan',
  foreignKey:'id_deliveror'
});
User.hasMany(Delivery, {
  as: 'DeliveryMan',
  foreignKey: 'id_deliveror'
})

Delivery.hasMany(Order, {
  foreignKey: 'id_delivery'
})

