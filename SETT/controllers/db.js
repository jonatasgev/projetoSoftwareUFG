var mongoose = require('mongoose');                                         // importando o mongoose

mongoose.connect(                                                           // conectando com o banco de dados
    'mongodb://localhost/node-starter',
    { user: '', pass: '', useNewUrlParser: false }
);

mongoose.connection.on('error', function () {                               // mensagem de erro na conexão com o banco
    console.log("erro ao conectar ao banco de dados");
});

mongoose.connection.once('open', function () {                              // mensagem de sucesso na conexão com o banco
    console.log("conexão com mongodb://localhost/node-starter feita");
});

module.exports = mongoose;