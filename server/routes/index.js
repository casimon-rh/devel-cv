const statsController = require('../controllers/stats');
module.exports = (app) =>{
    // app.get('/api/syncGithub',statsController.syncGithub);
    // app.get('/api/syncWaka',statsController.syncWaka);
    app.get('/api/listGithub',statsController.listGithub);
    app.get('/api/listWaka',statsController.listWaka);
}