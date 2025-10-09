const  express = require('express');
const router = express.Router();
const {changeDate, getPagedEvents, filterEvents} = require("../controllers/event-controllers");

router.get('/events', function(req, res) {
    let pageNum = req.query.page ? parseInt(req.query.page) : 1;
    let disableNext = req.query.page === "3" ? "" : `/events/?page=${pageNum + 1}`;
    let disablePrev = req.query.page === "1" ? '' : `/events/?page=${pageNum - 1}`;
    let filter = null;
    if (req.query)
    {
        filter = req.query;
    }

    let eventArray = filterEvents(filter);
    let eventItems = getPagedEvents(pageNum, eventArray);
    eventItems = changeDate(eventItems);

    // let eventItems = getPagedEvents(req.query.page);
    res.render('events-server', {
        title: 'Events',
        eventItems,
        disableNext,
        disablePrev,
    })
})



module.exports = router;
