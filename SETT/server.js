var express = require('express');                                           // importando o express js
var handlebars = require('express-handlebars');                             // importando o express-handlebars
var bodyParser = require('body-parser');                                    // importando o body-parser
var db = require('./controllers/db');

var app = express();                                                        // criando o app

app.use(bodyParser.urlencoded({ extended: false }));                        // passa os dados recebidos para json
app.use(bodyParser.json());                                                 // passa os dados recebidos para json

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));            // configurando o view engine handlebars
app.set('view engine', 'handlebars');                                       // configurando o view engine handlebars
app.use('/', require('./routes/index'));

app.use('/js', express.static('views/js'));
app.use('/css', express.static('views/css'));

app.listen(3000, function () {                                              // iniciando a aplicação (servidor) na porta 3000
    console.log('rodando na porta 3000');
});