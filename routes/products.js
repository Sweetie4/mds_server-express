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
const sequelize_trashed = new Sequelize('mssql://sa:msqlPASSWORD123456@localhost:40110/gpa_trashed');

export let router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id_category
 *         - price
 *         - stock
 *         - label
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the product
 *         id_category:
 *           type: int
 *           description: id of the product's category
 *         price:
 *           type: float
 *           description: product's price
 *         stock:
 *           type: int
 *           description: Quantity of product in stock
 *         label:
 *           type: string
 *           description: Product's name
 *       example:
 *         id_category: 1
 *         price: 12.00
 *         stock: 14526
 *         label: Cahier Clairefontaine
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Success message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 *
 */
router.post('/', async function(req, res, next) {
  try{
    await Product.create(req.body);
    res.json({"success":"Le produit a bien été enregistré"})
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The products id 
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *
 */
router.get('/:id', async function(req, res, next) {
  try{
    let id = req.params.id;
    const product = await Product.findOne({where: { id }, include: [Category, {model: Criter,through: { attributes: [] }}] })
    res.json(product);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /products:
 *   get:
 *     summary: Get all products 
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The product response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The products was not found
 *
 */
router.get('/', async function(req, res, next) {
  try{
    const products = await Product.findAll({include: [Category, {model: Criter,through: { attributes: [] }}]});
    res.json(products);
  } catch (err){
    console.error('Erreur : '+err)
  }
});

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /products/{id}:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 */
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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /products/{id}:
 *  delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
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