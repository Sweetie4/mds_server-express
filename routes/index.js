import { Router } from 'express';
import { base_url } from '../bin/www';
export let router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('layout', { page:'home',title: 'Accueil', isAdmin:false, base_url, user:req.session.user  });
});

router.get('/b2b', function(req, res, next) {
  res.render('layout', { page:'b2b',title: 'B2B', isAdmin:false, base_url, user:req.session.user  });
});

router.get('/b2c', function(req, res, next) {
  res.render('layout', { page:'b2c',title: 'B2C', isAdmin:false, base_url, user:req.session.user });
});
router.get('/livraisons', function(req, res, next) {
  res.render('layout', { page:'livraisons',title: 'Livraisons', isAdmin:false, base_url, user:req.session.user  });
});

router.get('/connexion', function(req, res, next) {
  res.render('layout', { page:'connexion',title: 'Connexion', isAdmin:false, base_url, user:req.session.user  });
});

router.get('/login-tchat', function(req, res, next) {
  res.render('layout', { page:'login_tchat',title: 'Connexion au Tchat', isAdmin:false, base_url  });
});

router.post('/login', function(req, res, next) {
  req.session.save(() => {
    req.session.logged_in = true;
    req.session.user = {
      login:req.body.login,
      password: req.body.password,
    };
    // res.json({ user: req.session.user, message: 'Vous êtes connecté ! ' });
  });
  res.render('layout', { page:'home',title: 'Accueil', isAdmin:false, base_url, user:req.session.user });
});

router.get('/logout',
  (req, res) => {
      req.session.destroy((err) => {
          if (err) {
              console.error(err);
              res.status(500).send('Error logging out');
          } else {
              res.send('Logged out');
          }
      });
  });