const  express = require('express');
const router = express.Router();
const {changeDate, getPagedEvents} = require("../controllers/event-controllers");

router.get('/events', function(req, res) {
    let eventItems = changeDate();
    // let eventItems = getPagedEvents(req.query.page);
    res.render('events-server', {title: 'Events', eventItems})
})



module.exports = router;
