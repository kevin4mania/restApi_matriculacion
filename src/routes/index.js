const { Router } = require('express');
const router = Router();


router.get('/apiMatriculacion/main', (req, res) => {
    const data = {
        "name": "Api to MATRICULACION",
        "website": "MATRICULACION-AMT",
        "v1.0": "2022-03-10",
    }
    res.json(data);
});

module.exports = router;