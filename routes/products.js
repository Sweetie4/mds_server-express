import { Router } from 'express';
import { Product } from '../models/Product.js';
import { Sequelize } from 'sequelize';
const sequelize_trashed = new Sequelize('mssql://tp_access:safemdp@MAHORA:1433/gpa_trashed');

export let router = Router();

router.post('/', async function(req, res, next) {
  try{
    await Product.create(req.body);
    res.json({"success":"Le produit a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    const product = await Product.findOne({where: { id } })
    res.json(product);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/', async function(req, res, next) {
  try{
    const products = await Product.findAll();
    res.json(products);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    await Product.update(
    req.body,
    {
      where: {
        id: id,
      },
    },
  );
  res.json({"success":"Le produit a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:id', async function(req, res, next) {
  try{
    let id =  req.params.id;
    const t = await sequelize_trashed.transaction();
    await sequelize_trashed.query('SET IDENTITY_INSERT gpa_trashed.global.product ON;', { transaction: t });

    await Product.destroy({
      where: { id: id }
    });
    
    res.json({"success":"Le produit a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/* Product Relationships */

