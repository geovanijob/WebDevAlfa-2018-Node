const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');


router.post('/', authenticationMiddleware, controller.cadastro);
router.get('/',  authenticationMiddleware, controller.listagem);
router.get('/:id',authenticationMiddleware, controller.buscaPorId);
router.put('/:id',authenticationMiddleware,  controller.edicao);
router.delete('/:id',authenticationMiddleware, controller.remocao);
router.put('/:id/concluida', authenticationMiddleware, controller.marcarConcluida);
router.delete('/:id/concluida',authenticationMiddleware, controller.desmarcarConcluida);







router.get('/:id')
/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

module.exports = router;
