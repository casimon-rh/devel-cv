const statsController = require('../controllers/stats');
const checkAuthToken = (token) => token === process.env.CV_SOCKET_TOKEN;


const sockets = (io) => {
    io.on('connection', (socket) => {
        socket.auth = false;
        socket.on('authenticate', (data) => {
            socket.auth = checkAuthToken(data.token);
        });
        socket.on('syncGithub', () => {
            if (socket.auth) {
                statsController.syncGithub(socket);
            }
        });
        socket.on('syncWaka', () => {
            if (socket.auth) {
                statsController.syncWaka(socket);
            }
        });
    });
}

module.exports = sockets;