var Calendario = {};

Calendario.diaDaSemana = function (dia, mes, ano) {
    return new Date(ano, --mes, dia).getDay();
}

Calendario.quantidadeDeDiasNoMes = function (mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

Calendario.mes = function (mes, ano) {
    if (!mes) mes = 1;

    var startSemana = Calendario.diaDaSemana(1, mes, ano);
    var quantidade = Calendario.quantidadeDeDiasNoMes(mes, ano);
    var endSemana = Calendario.diaDaSemana(quantidade, mes, ano);

    var mesAnterior = mes != 1 ? Calendario.quantidadeDeDiasNoMes(mes - 1, ano) : 31;

    var result = [];
    var semana = [];

    for (var i = 0; i < startSemana; i++) {
        semana.unshift({
            dia: mesAnterior,
            mes: mes - 1,
            tarefas: []
        });
        mesAnterior--;
    }

    for (var i = 1; i <= quantidade; i++) {
        if (semana.length == 7) {
            result.push({
                semana: semana
            });
            semana = [];
        }

        semana.push({
            dia: i,
            mes: mes,
            tarefas: []
        });
    }

    if (endSemana != 6) {
        for (var i = 1; i < 7 - endSemana; i++) {
            if (semana.length == 7) {
                result.push({
                    semana: semana
                });
                semana = [];
            }

            semana.push({
                dia: i,
                mes: mes,
                tarefas: []
            });
        }
        if (semana.length == 7) {
            result.push({
                semana: semana
            });
            semana = [];
        }
    }

    return result;
}

module.exports = Calendario;