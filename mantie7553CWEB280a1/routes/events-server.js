const  express = require('express');
const router = express.Router();
const {changeDate, getPagedEvents, filterEvents} = require("../controllers/event-controllers");

router.get('/', function(req, res) {
    let pageNum = req.query.page ? parseInt(req.query.page) : 1;
    let next = req.query.page === "3" ? "" : `/events/?page=${pageNum + 1}`;
    let prev = req.query.page === "1" ? '' : `/events/?page=${pageNum - 1}`;
    req.query.type ??= 'all';
    req.query.status ??= 'all';
    let filterParams = `&type=${req.query.type}&status=${req.query.status}`;
    let filter = req.query;

    let eventArray = filterEvents(filter);
    let eventItems = getPagedEvents(pageNum, eventArray);
    eventItems = changeDate(eventItems);

    res.render('events-server', {
        title: 'Events',
        eventItems,
        next,
        prev,
        filterParams
    })
})



module.exports = router;
