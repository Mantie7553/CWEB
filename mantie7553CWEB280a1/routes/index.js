var express = require('express');
var router = express.Router();

const multer = require('multer');
const {validationResult, check} = require('express-validator');
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
    check('emailInput', 'Format of emails must match name@domain').isEmail(),
    check('phoneInput', "Format of phone numbers must match ###-###-####").matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
    function (req, res) {
        const errors = validationResult(req);

        let emailMessage = '';
        let phoneMessage = '';

        if (!errors.isEmpty())
        {
            for (let err of errors.array())
            {
                let stringError = err.msg.toString();
                if (stringError.includes('email'))
                {
                    emailMessage = err.msg;
                }
                else
                {
                    phoneMessage = err.msg;
                }
            }
            res.render('job-application', {title: 'Failed', emailMessage, phoneMessage});
        }

        res.render('job-application', { title: 'Job Application'});
});

module.exports = router;
