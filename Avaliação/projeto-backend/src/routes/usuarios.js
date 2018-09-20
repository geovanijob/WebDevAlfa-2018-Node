const express = require('express');
const router = express.Router();


const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');

const {authenticationMiddleware} = require('../utils/token');

/*******

 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };

 *******/

const validateBody = {
    nome: {
        in: "body",
        notEmpty: true,
        errorMessage: "Nome Invalido, Tente novamente"
    },
    email: {
        in: "body",
        notEmpty: true,
        errorMessage: "Email invalido, Tente novamente"
    },
    cpf: {
        in: "body",
        notEmpty: true,
        errorMessage: "CPF invalido, Tente novamente"
    },
    senha: {
        in: "body",
        notEmpty: true,
        errorMessage: "Senha invalido, Tente novamente"
    },
    nascimento: {
        in: "body",
        notEmpty: true,
        errorMessage: "Data de nascimento invalida, Tente novamente"
    },
};


router.post('/', validateSchema(validateBody),authenticationMiddleware, controller.cadastro);
router.get('/:usuarioId',authenticationMiddleware,controller.buscaPorId);
router.post('/login',controller.login);
router.put('/:usuarioId',authenticationMiddleware, controller.edicao);



/*
    router.delete('/:usuarioId', function(request,response){
        const{ params } = request;
        const { usuarioId } = params;

        Usuario.destroy({
            where: {
                id: usuarioId
            }
        })
        .then(deletado =>{
            if(deletado > 0){
                response.status(204).send();
            }else{
                response.status(404).send('Usuário não encontrado')
            }
        })
        .catch(ex =>{
            console.error(ex);
            response.status(412).sendStatus('Não foi possivel deletar o usuário.')
        })
    })


   
/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

module.exports = router;
