const  express = require('express');
const router = express.Router();

router.get('/events', function(req,res) {
    res.render('events-ui');
})




module.exports = router;