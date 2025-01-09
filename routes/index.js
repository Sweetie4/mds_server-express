import { Router } from 'express';
import { base_url } from '../bin/www';
export let router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { page:'home',title: 'Accueil', isAdmin:false, base_url });
});

router.get('/b2b', function(req, res, next) {
  res.render('layout', { page:'b2b',title: 'B2B', isAdmin:false, base_url });
});

router.get('/b2c', function(req, res, next) {
  res.render('layout', { page:'b2c',title: 'B2C', isAdmin:false, base_url });
});
router.get('/livraisons', function(req, res, next) {
  res.render('layout', { page:'livraisons',title: 'Livraisons', isAdmin:false, base_url });
});

router.get('/connexion', function(req, res, next) {
  res.render('layout', { page:'connexion',title: 'Connexion', isAdmin:false, base_url });
});

router.post('/login', function(req, res, next) {
  res.render('layout', { page:'home',title: 'Accueil', isAdmin:false, base_url });
});