const controller = require('../controllers/user-stories')

module.exports = (app, router) => {
    router.post('/', controller.create);

    router.get('/', controller.list);

    router.get('/:id', controller.index);

    router.put('/:id', controller.replace);

    router.patch('/:id', controller.update);

    router.delete('/:id', controller.destroy);
};
