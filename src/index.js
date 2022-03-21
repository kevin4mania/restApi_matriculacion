const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./configs/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//settings
app.set('port', process.env.PORT || config.PORT);
app.set('json spaces', 2)
app.use(cors())

//middlewares
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//routesWSDL
app.use('/inicio', require('./routes/ruta'));


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});