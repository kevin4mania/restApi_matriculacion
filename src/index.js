const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//settings
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2)
app.use(cors())

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/api/consultasGenerales', require('./routes/consultasGenerales'));
app.use('/api/rtv', require('./routes/rtv'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});