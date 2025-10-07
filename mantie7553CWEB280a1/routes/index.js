var express = require('express');
var router = express.Router();

const multer = require('multer');
const {query, validationResult} = require('express-validator');
const fs = require('fs');

const uploadFuncs = multer({
  dest: 'public/pdfs',
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    }
    else
    {
      return cb(new Error('Only pdfs are allowed'), false);
    }
  },
  limits: {filesize: 1024 * 1024 * 5} //max size of 5mb
});


/* GET home page */
router.get('/', function (req, res) {
  res.render('home', {title: 'Home'});
});

/* GET application page. */
router.get('/application', function(req, res) {

  res.render('job-application', {title: 'Job Application'});

});

router.post('/application',
    uploadFuncs.fields([{name: 'uploadFile', maxCount: 1}]),
    query('nameInput, phoneInput, emailInput, positionInput, uploadFile').notEmpty().trim(),
    query('emailInput.').isEmail().withMessage("Please enter a valid email address"),
    query('phoneInput').matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/).withMessage("Format of phone numbers must match ###-###-####"),
    function (req, res) {
        const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({errors: errors.array()});
        // }

        res.render('job-application', { title: 'Job Application'});
});

module.exports = router;
