const  express = require('express');
const {filterEvents, getPagedEvents, changeDate} = require("../../controllers/event-controllers");
const router = express.Router();

router.get('/events', function (req,res){
    let pageNum = req.query.page ? parseInt(req.query.page) : 1;

    let filter = null;
    if (req.query)
    {
        filter = req.query;
    }
    let events = filterEvents(filter);
    let pagedEvents = getPagedEvents(pageNum, events);
    let finalEvents = changeDate(pagedEvents);

    if (finalEvents.length)
    {
        return res.status(200).json(finalEvents);
    }

    return res.status(404).json({error: 'No events found'});
})





module.exports = router;
