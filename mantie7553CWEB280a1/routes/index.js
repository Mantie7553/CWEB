const  express = require('express');
const router = express.Router();

const multer = require('multer');
const {validationResult, check} = require('express-validator');
const fs = require('fs');

/**
 * Function used to handle error checking for pdf upload
 * - Keeps size of uploaded files to less than 5mb
 * - Confirms files are pdfs
 * @type {Multer}
 */
const uploadFuncs = multer({
  dest: 'public/uploads',
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

/**
 * Function that moves the uploaded file to the pdfs folder
 * - All files will originally be added to the uploads folder
 * - Once moved you can find the files under the pdfs folder
 * @param file the file to be moved
 * @param newPath the new path of the file
 */
const moveFile = (file, newPath) => {
    newPath += file.filename + '-' + file.originalname;
    fs.rename(file.path, newPath, (err) => {
        if (err) throw err;
    })
    file.filename += '-' + file.originalname;
    file.path = newPath;
}


/* GET home page */
router.get('/', function (req, res) {
  res.render('home', {title: 'Home'});
});

/* GET application page. */
router.get('/application', function(req, res) {

  res.render('job-application', {title: 'Job Application'});

});

/* POST application page */
router.post('/application',
    uploadFuncs.fields([{name: 'uploadFile', maxCount: 1}]),
    check('emailInput', 'Format of emails must match name@domain').isEmail(),
    check('phoneInput', "Format of phone numbers must match ###-###-####").matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
    function (req, res) {
        const errors = validationResult(req);

        let emailMessage = '';
        let phoneMessage = '';
        let fileToShow;

        for (const [fieldName, fileArray] of Object.entries(req.files))
        {
            for (const tempFile of fileArray)
            {
                moveFile(tempFile, __dirname + '/../public/pdfs/');
                fileToShow = tempFile;
            }
        }
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
            /* Display Error */
            res.render('job-application', {title: 'Job Application', emailMessage, phoneMessage});
        }

        /* Display information sent through form */
        res.render('job-application', {
            title: 'Job Application',
            completed: true,
            name: req.body.nameInput,
            email: req.body.emailInput,
            phone: req.body.phoneInput,
            position: req.body.positionInput,
            file: '/pdfs/' + fileToShow.filename
        });
});

module.exports = router;
