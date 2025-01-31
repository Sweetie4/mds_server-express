import { determineCoupure } from '@shirleen1/dab';
import { equal } from 'assert';


describe('DAB', function () {
  
  describe('The call is correct', function () {
    it('should return all the required coupures', function () {

    let content = {message:"# dab 88.88€", user:'Test'}

      let command = content.message.split(' ');
      let data = command[2];
      let response = "";
      if (data.includes('€') ){
        response = determineCoupure({montant:data.split('€')[0],devise:'€'});
      } else if(data.includes('$')){
        response = determineCoupure({montant:data.split('$')[0], devise:'$'});
      } else {
        response = 'devise non prise en charge';
      }

      let msg = {
        user: "Bot",
        content: content.user+", "+response,
        time: "2025-01-31T13:33:31.039Z"
      }
    
      let correct_message = {
        user: "Bot",
        content: "Test, Vous avez demandé 88.88€\n\nVous recevez 1 billet de 50€,\n1 billet de 20€,\n1 billet de 10€,\n1 billet de 5€,\n1 pièce de 2€,\n1 pièce de 1€,\n1 pièce de 0.5€,\n1 pièce de 0.2€,\n1 pièce de 0.1€,\n1 pièce de 0.05€,\n1 pièce de 0.02€ et\n1 pièce de 0.01€.",
        time: "2025-01-31T13:33:31.039Z"
      }
      equal(msg, correct_message);
    });
  });
});