import { Server } from "socket.io";
import {determineCoupure} from '@shirleen1/dab';


export  default function (httpServer) {
    const io = new Server(httpServer, { });
    let messages = []
    
    io.on("connection", (socket) => {
        socket.emit('timeline', messages);
        socket.join("TheRoom");
        socket.on('message',(content)=>{
            let msg={};
            if (content.message.includes('# dab')){
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
                msg = {
                    user: "Bot",
                    content: content.user+", "+response,
                    time: new Date().toJSON()
                }
            } else {
                msg = {
                    user: content.user,
                    content: content.message,
                    time: new Date().toJSON()
                }
            }
            messages.push(msg);
            io.to("TheRoom").emit('newMessage',msg)
        })
    });
    return function(req, res, next) {
    }
}
