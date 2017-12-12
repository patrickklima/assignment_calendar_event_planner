const Express = require('express');
const router = Express.Router();
const {calendars} = require('../lib/data-service');

// INDEX
router.get('/', (req, res) => {
  calendars.all().then(allCalendars => {
    res.render('calendar-views/calendars', {
      calendars: allCalendars
    });
  })
  .catch(err => res.status(500).send(err.stack));
});

// NEW
router.get('/new', (req, res) => {
  console.log("trying to render");
  res.render('calendar-views/new-calendar');
});

// CREATE
router.post('/new', (req, res) => {
  calendars.create(req.body).then(newCalendar => {
    req.method = 'GET';
    res.redirect(`/calendars/${newCalendar.id}`);  
  });
});

// EDIT
router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  calendars.byId(id).then(calendarData => {
    console.log("calendarData");
    console.log(calendarData);
    res.render('calendar-views/edit-calendar', {calendar: calendarData});
  });
});

router.post('/:id/edit', (req, res) => {
  calendars.update(req.params.id, req.body)
  .then(() => {
    req.method = 'GET';
    res.redirect(`/calendars/${req.params.id}`);
  })
  .catch(err => res.status(500).send(err.stack));
});

// SHOW
router.get('/:id', (req, res) => {
  var id = req.params.id;
  calendars.byId(id).then(calendar => {
    res.render('calendar-views/calendar', {calendar: calendar});
  })
  .catch(err => res.status(500).send(err.stack));
});





module.exports = router;