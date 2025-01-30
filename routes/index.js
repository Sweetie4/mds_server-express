import { Router } from 'express';
import { base_url } from '../bin/www';
import { generateAccessToken } from '../app.js';
import { User } from '../models/User.js';
export let router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { page:'home',title: 'Accueil', isLogged:req.session.logged_in, base_url, user:req.session.user  });
});

router.get('/b2b', function(req, res, next) {
  res.render('layout', { page:'b2b',title: 'B2B', isLogged:req.session.logged_in, base_url, user:req.session.user  });
});

router.get('/b2c', function(req, res, next) {
  res.render('layout', { page:'b2c',title: 'B2C', isLogged:req.session.logged_in, base_url, user:req.session.user });
});
router.get('/livraisons', function(req, res, next) {
  res.render('layout', { page:'livraisons',title: 'Livraisons', isLogged:req.session.logged_in, base_url, user:req.session.user  });
});

router.get('/connexion', function(req, res, next) {
  res.render('layout', { page:'connexion',title: 'Connexion', isLogged:req.session.logged_in, base_url, user:req.session.user  });
});


router.post('/login', async function(req, res, next) {
   try{
      const response = await User.authenticate(req.body.login, req.body.password);
      if (response.user){
        req.session.logged_in = true;
        req.session.user = {
          login:req.body.login,
          password: req.body.password,
        };
        req.session.token = response.authToken;
        res.redirect(base_url)
      } else {
        res.redirect(base_url+'/connexion')
      }
    } catch (err){
      console.error('Erreur : '+err)
    }
});


router.get('/logout',
  (req, res) => {
    req.session= null,
    req.session.logged_in = false;
    res.redirect(base_url);
  });