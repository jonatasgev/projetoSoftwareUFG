var mongoose = require('mongoose');                         // importando o mongoose

var tarefaSchema = mongoose.Schema({                        // definindo os dados que serão salvos
    titulo: { type: String, required: true },
    tipo: { type: String, required: true },
    descricao: { type: String },
    previsao: { type: String },
    ano: { type: String, required: true },
    mes: { type: String, required: true },
    dia: { type: String, required: true },
    status: { type: String }
});

var Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;                                    // exportando