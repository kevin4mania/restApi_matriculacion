const config = require('../configs/config');
const { Router, request, response } = require('express');
const { result } = require('underscore');
const router = Router();
const strongSoap = require('strong-soap').soap


router.get('/saluda/:nombre', (req, res) => {
        const { nombre } = req.params;
        //const requestArgs = { nombre: nombre }

        res.json({ 'resultado': 'hola ' + nombre });
    }

);



module.exports = router;