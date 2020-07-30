const express = require('express');
const feriados = require('./feriados');

const router = express.Router();

router.get('/', (req, res) =>
  res.json({
    status: "ok"
  })
);

//Rotas Feriados
router.use('/feriados', feriados);

module.exports = router;