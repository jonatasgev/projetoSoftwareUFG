var router = require('express').Router();                               // criando as rotas usando Express
var TarefaController = require('./../controllers/TarefaController');    // importando o controlador

// rotas
// create
router.post('/', TarefaController.create);
// read
router.get('/', TarefaController.read);
// update
router.post('/update', TarefaController.update);
// delete
router.post('/delete', TarefaController.delete);

module.exports = router; // exportando rotas