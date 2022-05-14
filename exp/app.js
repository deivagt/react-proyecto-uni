var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();

var indexRouter = require('./routes/index');
var login = require('./routes/login');
var testAPIRouter = require('./routes/pruebaExp');
var regUse = require('./routes/registroUsuario');
var inve = require('./routes/inventario')
var bien = require('./routes/bien');
var cursosAdmin = require('./routes/cursosAdmin')
var listaCursos = require('./routes/listaCursos')
var listaEstudiantes = require('./routes/estudiantes')
var pagos = require('./routes/pagos')
var ingresoEgreso = require('./routes/ingresoEgreso')
var contactos = require('./routes/contactos')
var admin = require('./routes/admin')
var col = require('./routes/col')
var noticia = require('./routes/noticia')
var asigCur = require('./routes/asignarCurso')
var asigEnc =require('./routes/asignarEncargado')
var cafe = require('./routes/cafe')
var entregas = require('./routes/entregas')
var asigCursos = require('./routes/asigCur')
var mensajes = require('./routes/mensajes')
var todos = require('./routes/usuarios')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/login', login);
app.use('/pruebaExp', testAPIRouter);
app.use('/registroUsuario', regUse);
app.use('/inventario', inve)
app.use('/bien', bien)
app.use('/cursosAdmin', cursosAdmin)
app.use('/listaCursos', listaCursos)
app.use('/listaEstudiantes', listaEstudiantes)
app.use('/pagos', pagos)
app.use('/ingresoEgreso', ingresoEgreso)
app.use('/contactos', contactos)
app.use('/administrador', admin)
app.use('/colaborador', col)
app.use('/noticia', noticia)
app.use('/asignacionCurso',asigCur)
app.use('/asignacionEncargado', asigEnc)
app.use('/cafe', cafe)
app.use('/entregas', entregas)
app.use('/asignacionesCurso', asigCursos)
app.use('/mensajes', mensajes)
app.use('/listaUsuarios', todos)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});






// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
