const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res) => {
    res.render('index', { projects }); // renders the index.pug file
});

module.exports = router;