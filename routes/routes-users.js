const Express = require('express');
const router = Express.Router();
const {users} = require('../lib/data-service');

// INDEX
router.get('/', (req, res) => {
  users.all().then(allUsers => {
    res.render('user-views/users', {
      users: allUsers,
    });
  })
  .catch(err => res.status(500).send(err.stack));
});

// NEW
router.get('/new', (req, res) => {
  res.render('user-views/new-user');
});


// CREATE 
router.post('/new', (req, res) => {
  users.create(req.body).then(newUser => {
    res.redirect(`/users/${newUser.id}`);
  })
  .catch(err => res.status(500).send(err.stack));
});

// DISPLAY 
router.get('/:id', (req, res) => {
  var id = req.params.id;
  users.byId(id).then(currentUser => {
    // console.log(currentUser.calendars);
    res.render('user-views/user', {
      user: currentUser.data,
      calendars: currentUser.calendars
    });
  })
  .catch(err => res.status(500).send(err.stack));
});

// EDIT
router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  users.byId(id).then(userData => {
    console.log(userData);
    res.render('user-views/edit-user', {user: userData.data});
  })
  .catch(err => res.status(500).send(err.stack));
});

router.post('/:id/edit', (req, res) => {
  users.update(req.params.id, req.body)
    .then(() => {
      req.method = "GET";
      res.redirect(`/users/${req.params.id}`);
  });
});


// DELETE
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  users.delete(id).then(() => {
    req.method = 'GET';
    res.redirect('/users');
  })
  .catch(err => res.status(500).send(err.stack));
});



module.exports = router;