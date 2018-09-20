const {Usuario} = require ('../models');
const {generateToken} = require('../utils/token');


function cadastro(request, response, next) {
    const{body} = request;
    const { nome, email, cpf, senha, nascimento} = body;
    Usuario.create({
        nome, email, cpf, senha, nascimento
    })
    .then(usuario =>{
        response.status(201).json(usuario);
    })
    .catch(ex =>{
        console.error(ex);
        response.status(412).send("Não foi possivel incluir o usuário: ")
    })
}
/* busca por id */
function buscaPorId(request, response, next) {
        const{params} = request;
        const {usuarioId} = params;

        Usuario.findById(usuarioId)
        .then(usuario =>{
            if(!usuario){
                response.status(404).send("Usuário não encontrado.")
            }else{
                response.status(200).json(usuario);
            }
        })
        .catch(ex =>{
            response.status(412).send("Não foi possivel consultar o usuário")
        })

}
/*fim busca por id*/


function edicao(request, response, next) {
    const{params,body} = request;
        const {usuarioId} =  params;

        const{nome,email,cpf,senha,nascimento} = body;
        Usuario.findById(usuarioId)
        .then(usuario =>{
            if(!usuario){
                response.status(404).send('Usuário não encontrado.')
            }else{
                return usuario.update({
                    nome,email,cpf,senha,nascimento
                }).then(() =>{
                    response.status(200).json(usuario);
                })
                .catch(ex =>{               
                    console.error(ex);
                    response.status(412).sendStatus('Não foi possivel alterar o usuário');
                })
            }
        })
}


function login(request, response, next) {  
const {body} = request; //body é uma variavel dentro do request
const {nome, senha} = body;

const usuarioQuery = {
    where: {nome: nome, senha: senha}
};

Usuario.findOne(usuarioQuery)
.then(result =>{
    if(!result){
        response.status(412).send("usuário ou senha incorretos");
    }else{
        const payload = {
            nome: nome,
            senha: senha
        };
        const token = generateToken(payload)
        response.status(200).cookie('token',token).send({
        token
        
        });
    }
})

.catch(ex =>{
    console.error(ex);
    response.status(412).send('não foi possivel')
})
      
}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login
};
