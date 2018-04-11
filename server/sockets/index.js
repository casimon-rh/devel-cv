const statsController = require('../controllers/stats');
const sockets = (io) =>{
    io.on('connection',(socket)=>{
        socket.on('syncGithub',()=>{
            statsController.syncGithub(socket);
        });
        socket.on('syncWaka',()=>{
            statsController.syncWaka(socket);
        });
    });
}

module.exports=sockets;