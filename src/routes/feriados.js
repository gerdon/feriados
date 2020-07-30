const express = require('express');
const feriados = require('../controller/feriados');

const router = express.Router();

router.route('/:codigoIBGE/:ano-:mes-:dia').get(feriados.get);
router.route('/:codigoIBGE/:mes-:dia').put(feriados.put);
router.route('/:codigoIBGE/:mes-:dia').delete(feriados.del);
router.route('/nacionais').post(feriados.postNacionais);

module.exports = router;