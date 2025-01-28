import { Router } from 'express';
import { Product } from '../models/Product.js';
import { Sequelize } from 'sequelize';
import { OrderProduct } from '../models/OrderProduct.js';
import { Order } from '../models/Order.js';
import { Category } from '../models/Category.js';
import { CategoryCriter } from '../models/CategoryCriter.js';
import { Criter } from '../models/Criter.js';
import { CriterProduct } from '../models/CriterProduct.js';
import { User } from '../models/User.js';
import { Comment } from '../models/Comment.js';
import { Stock} from '../models/Stock.js'
import { ProductStock} from '../models/ProductStock.js'
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
    const product = await Product.findOne({where: { id }, include: [Category, {model: Criter,through: { attributes: [] }}] })
    res.json(product);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/', async function(req, res, next) {
  try{
    const products = await Product.findAll({include: [Category, {model: Criter,through: { attributes: [] }}]});
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


router.post('/:id/comments', async function(req, res, next) {
  try{
    let id =  req.params.id;
    await Comment.create({id_product: id, id_user:req.body.id_user, content:req.body.content});
    res.json({"success":"Le commentaire a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:id/comments', async function(req, res, next) {
  try{
    let id = req.params.id;
    const product = await Comment.findAll({where: { id_product:id }, include: [User] })
    res.json(product);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.get('/:product_id/comments/:comment_id', async function(req, res, next) {
  try{
    let productId = req.params.product_id;
    let commentId = req.params.comment_id;
    const product = await Comment.findOne({where: { id_product:productId, id:commentId }, include: [User] })
    res.json(product);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.put('/:product_id/comments/:comment_id', async function(req, res, next) {
  try{
    let productId = req.params.product_id;
    let commentId = req.params.comment_id;
    await Comment.update(
    req.body,
    {
      where: {
        id: commentId,
        id_product: productId
      },
    },
  );
  res.json({"success":"Le commentaire a bien été mis à jour"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

router.delete('/:product_id/comments/:comment_id', async function(req, res, next) {
  try{
    let productId = req.params.product_id;
    let commentId = req.params.comment_id;
    await Comment.destroy({
      where: { id: commentId, id_product:productId }
    });
    
    res.json({"success":"Le commentaire a bien été supprimé"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/* Product Relationships */

Product.belongsToMany(Order, {
  through: OrderProduct,    
  foreignKey: 'id_product', 
  otherKey: 'id_order',     
});

Product.belongsTo(Category,{
  foreignKey:'id_category'
})

Category.hasMany(Product,{
  foreignKey:'id_category'
})

Category.belongsToMany(Criter, {
  through: CategoryCriter,    
  foreignKey: 'id_category', 
  otherKey: 'id_criter',     
});

Product.belongsToMany(Criter, {
  through: CriterProduct,
  foreignKey: 'id_product',
  otherKey: 'id_criter'
})  

Comment.belongsTo(Product,{
  foreignKey:'id_product'
})

Product.hasMany(Comment,{
  foreignKey: 'id_product'
})

Comment.belongsTo(User,{
  foreignKey:'id_user'
})

User.hasMany(Comment,{
  foreignKey: 'id_user'
})

Product.belongsToMany(Stock,{
  through:ProductStock,
  foreignKey:'id_product',
  otherKey:'id_stock'
})