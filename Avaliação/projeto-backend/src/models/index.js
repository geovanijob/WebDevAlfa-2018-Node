const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

/*******
 * TODO: Definição dos modelos.
 * Defina aqui os modelos a serem mapeados para entidades do banco de dados.
 *******/
const Usuario = sequelize.define('usuario', {
    id:{
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true, 
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(11),
    },
    senha: Sequelize.STRING(100),
    nascimento: Sequelize.DATEONLY,
    email:{
        type: Sequelize.STRING(200),
        unique: true,
    }
});

const Tarefa = sequelize.define('tarefa', {
    id:{
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true, 
    },
    titulo: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    descricao:{
        type: Sequelize.STRING(300),
    },
    concluida:{
        type: Sequelize.BOOLEAN,
    },
    usuarioId:{
        type: Sequelize.BIGINT,
    }


})

/*******
 * TODO: Definição das relações.
 * Defina aqui os relacionamentos entre os modelos.
 *******/

Usuario.hasMany(Tarefa, {
    foreinKey: 'usuarioId',
    isnullable:true
});

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
};
