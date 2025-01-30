import { Router } from 'express';
import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { Service } from '../models/Service.js';
import { UserService } from '../models/UserService.js';
export let router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id_profile
 *         - first_name
 *         - last_name
 *         - login
 *         - password_hashed
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         id_profile:
 *           type: int
 *           description: id of linked profile
 *         id_commercial:
 *           type: int
 *           description: id of linked commercial
 *         first_name:
 *           type: string
 *           description: First name of the user
 *         last_name:
 *           type: string
 *           description: User's last name
 *         login:
 *           type: string
 *           description: User's username to authenticate
 *         password:
 *           type: string
 *           description: User's password to authenticate
 *       example:
 *         id_profile: 1
 *         id_commercial: null
 *         first_name: Richard
 *         last_name: Martin
 *         login: rmartin
 *         password: mdp
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/role/{role}:
 *   get:
 *     summary: Get all users of the role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: The role id 
 *     responses:
 *       200:
 *         description: The user response by role
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The users was not found
 */
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *  delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
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