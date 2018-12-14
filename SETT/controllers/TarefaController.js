var Calendario = require('../models/Calendario');
var Tarefa = require('../models/Tarefa');

var TarefaController = {};

TarefaController.create = function (req, res) {
    var evento = new Tarefa({
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        descricao: req.body.descricao.replace(/\r\n/g, '{/n}'),
        previsao: req.body.previsao,
        ano: req.body.ano,
        mes: req.body.mes,
        dia: req.body.dia
    });

    evento.save(function (err, newTarefa) {
        if (err) return console.error(err);
        res.redirect('/');
    });
}

TarefaController.read = function (req, res) {
    var mes = req.query.mes ? req.query.mes : 1;

    Tarefa.find({ mes: { $eq: mes } }, function (err, tarefas) {
        var anoAtual = new Date().getFullYear();
        var quantidadeDeDias = Calendario.quantidadeDeDiasNoMes(mes, anoAtual);
        var calendario = Calendario.mes(mes, anoAtual);

        tarefas.forEach(function (t) {
            calendario.forEach(function (s) {
                s.semana.forEach(function (d) {
                    if (d.mes == mes && d.dia == t.dia) {
                        d.tarefas.push(t);
                    }
                })
            })
        })

        res.render('index', {
            diaUmNaSemana: Calendario.diaDaSemana(0, mes, anoAtual),
            ultimoDiaNaSemana: Calendario.diaDaSemana(quantidadeDeDias, mes, anoAtual),
            quantidadeDeDias: quantidadeDeDias,
            calendario: calendario,
            tarefas: tarefas
        });
    });
}

TarefaController.update = function (req, res) {
    Tarefa.updateOne({
        "_id": req.body.id
    }, {
            $set: {
                titulo: req.body.titulo,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                previsao: req.body.previsao,
                ano: req.body.ano,
                mes: req.body.mes,
                dia: req.body.dia,
                status: req.body.status
            }
        }, function (err, resp) {
            res.status(200).send();
        });
}

TarefaController.delete = function (req, res) {
    Tarefa.findByIdAndDelete(req.body.id, function (err, eventos) {
        res.status(200).send();
    });
}

module.exports = TarefaController;