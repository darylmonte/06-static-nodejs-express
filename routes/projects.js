const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

/* GET generated error route - create and throw 500 server error */
router.get('/error', (req, res, next) => {
  const err = new Error('Oops! It looks like something went wrong on the server.');
  err.status = 500;
  throw err;
});

router.get('/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
      res.render('project', { project }); // renders the project.pug file
    } else {
      const err = new Error('This project does not exist.');
      err.status = 404;
      next(err);
    }
});

module.exports = router;