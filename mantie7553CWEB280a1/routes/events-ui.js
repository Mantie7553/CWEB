const  express = require('express');
const router = express.Router();

/* renders the events page ui */
router.get('/events', function(req,res) {
    res.render('events-ui');
})




module.exports = router;