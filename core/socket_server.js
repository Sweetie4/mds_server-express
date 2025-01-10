import { Server } from "socket.io";
import { router } from "../routes/index.js";


export  default function (httpServer) {
    const io = new Server(httpServer, { });
    
    io.on("connection", (socket) => {
        const username = socket.handshake.auth.username;
        // if (!username) {
        //     return console.error("invalid username");
        // }
        
        socket.username = username;
        router.get('/dab', function(req, res, next) {
            res.render('layout', { page:'dab',title: 'Tchat', isAdmin:false, base_url  });
        });
        socket.join("TheRoom");
        socket.on('message',(content)=>{
            let msg = {
                user: socket.username,
                content: content.message,
                time: new Date().toJSON()
            }
            io.to("TheRoom").emit('newMessage',msg)
        })
    });
    return function(req, res, next) {
    }
}
