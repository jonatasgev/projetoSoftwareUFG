function submitForm() {
    event.preventDefault();
    var id = $(event.currentTarget).find('input[name="id"]').val();
    var data = $(event.currentTarget).serialize();
    if (id !== '')
        $.ajax({
            url: '/update',
            type: 'post',
            data: data,
            success: function () {
                location.reload();
            }
        });
    else
        $.ajax({
            url: '/',
            type: 'post',
            data: data,
            success: function () {
                location.reload();
            }
        });
}

function deleteEvento() {
    var r = confirm("Tem certeza que deseja excluir essa tarefa?");
    var id = $('#modal1 input[name="id"]').val();
    if (r)
        $.ajax({
            url: '/delete',
            type: 'post',
            data: {
                id: id
            },
            success: function () {
                location.reload();
            }
        });
}

function updateEvento(data) {
    $('input[name="id"]').val(data.id);
    $('input[name="titulo"]').val(data.titulo);
    $('input[name="tipo"]').val(data.tipo);
    $('textarea[name="descricao"]').val(data.descricao.replace(/{\/n}/g, '\r\n'));
    $('input[name="previsao"]').val(data.previsao);
    $('input[name="ano"]').val(data.ano);
    $('input[name="mes"]').val(data.mes);
    $('input[name="dia"]').val(data.dia);
    $('#status').val(data.status);
    
    var instance = M.FormSelect.getInstance($('#status')[0]);
    instance.destroy();
    $('#status').material_select();

    $('#modal1').modal('open');
}

function cancel() {
    $('form').trigger("reset");
}

$(document).ready(function () {
    $('.modal').modal();

    $('.modal-trigger').on('click', function () {
        $('input[name="id"]').val('');
        cancel();
    });

    $('#selectMes').val(new URL(location.href).searchParams.get('mes'));

    $('select').material_select();

    $('.timepicker').pickatime({
        default: '0:00', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button,
        container: undefined, // ex. 'body' will append picker to body
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function () { } //Function for after opening timepicker
    });

    $('#modal1 input[name=tipo]').on('change', function () {
        alert(this.val())
    })
});