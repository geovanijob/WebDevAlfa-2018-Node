const {Usuario, Tarefa} = require ('../models');
function cadastro(request, response, next) {
    const{body} = request;
    const {titulo, descricao, concluida, usuarioId} = body;
    Tarefa.create({
        titulo, descricao, concluida, usuarioId
    })
    .then(tarefa =>{
        response.status(201).json(tarefa);
    })
    .catch(ex =>{
        console.error(ex);
        response.status(412).send("Não foi possivel incluir a tarefa: ")
    })

}

function listagem(request, response, next) {
    const {body} = request;
    const {titulo} = body;

    const tituloQuery = {
        where: {}
    };

    if (titulo) {
        tituloQuery.where.titulo = {
            [Sequelize.Op.like]: `%${titulo}%`
        };
    }

    Tarefa.findAll(tituloQuery)
        .then(tarefa => {
            response.status(200).json(tarefa);
        })
        .catch(ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel as tarefas.');
        });

}

function buscaPorId(request, response, next) {
    const { params } = request;
    const { id } = params;
        Tarefa.findById(id)
        .then(tarefa =>{
            if(!tarefa){
                response.status(404).send('Tarefa não encontrada');
            }else{
                response.status(200).json(tarefa);
            }
        });
}

function edicao(request, response, next) {
    const{params,body} = request;
    const {id} =  params;

    const{titulo,descricao,concluida,usuarioId} = body;
    Tarefa.findById(id)
    .then(tarefa =>{
        if(!tarefa){
            response.status(404).send('Usuário não encontrado.')
        }else{
            return tarefa.update({
                titulo,descricao,concluida,usuarioId
            }).then(() =>{
                response.status(200).json(tarefa);
            })
            .catch(ex =>{               
                console.error(ex);
                response.status(412).sendStatus('Não foi possivel alterar o usuário');
            })
        }
    })}

function remocao(request, response, next) {
    const {params} = request;
    const {id} = params;

    Tarefa.destroy({
        where: {
            id: id
        }
    })
        .then(removida => {
            if (removida) {
                response.status(204).send('Tarefa Removida.');
            } else {
                response.status(404).send('Tarefa não encontrada.');
            }
        })
        .catch(ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel remover a tarefa');
        });

}

function marcarConcluida(request, response, next) {
    const{params,body} = request;
    const {id} =  params;

    Tarefa.findById(id)
    .then(tarefa =>{
        if(!tarefa){
            response.status(404).send('Tarefa não encontrada.')
        }else{
            return tarefa.update({
                status: 1
            }).then(() =>{
                response.status(200).json(tarefa);
            })
            .catch(ex =>{               
                console.error(ex);
                response.status(412).sendStatus('Não foi possivel alterar a tarefa');
            })
        }
    })}



function desmarcarConcluida(request, response, next) {
    const{params,body} = request;
    const {id} =  params;

    Tarefa.findById(id)
    .then(tarefa =>{
        if(!tarefa){
            response.status(404).send('Tarefa não encontrada.')
        }else{
            return tarefa.update({
                status: 0
            }).then(() =>{
                response.status(200).json(tarefa);
            })
            .catch(ex =>{               
                console.error(ex);
                response.status(412).sendStatus('Não foi possivel alterar a tarefa');
            })
        }
    })}



module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};
