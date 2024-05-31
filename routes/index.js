var controller = require('../controllers/index');

module.exports = (app, router)=>{
    router.get('/', controller.home);
};
