import { Router } from 'express';
import { base_url } from '../bin/www';
export let router = Router();

router.post('/', function(req, res, next) {
    res.render('layout', { page:'dab',title: 'Tchat', logged_user:req.body.pseudo, base_url  });
})

router.get('/login', function(req, res, next) {
    res.render('layout', { page:'login_tchat',title: 'Connexion au Tchat', isAdmin:false, base_url  });
});