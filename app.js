// EXPRESS
const Express = require('express');
const app = Express();
const port = process.env.PORT;

// EXPRESS-HANDLEBARS
const exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main',
//   partialsDir: "views/"
// }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// MORGAN AND MORGAN TOOLKIT
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);
app.use(morganToolkit());

// METHOD OVERRIDE FOR /?_method=[POST || GET || PATCH || DELETE]
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

 
app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));

// BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// PUBLIC RESOURCES
// app.use(Express.static(`${__dirname}/public`));

// ROUTES
const users = require('./routes/routes-users');
const calendars = require('./routes/routes-calendars');
const events = require('./routes/routes-events');
const invitations = require('./routes/routes-invitations');

app.use('/users', users);
app.use('/calendars', calendars);
app.use('/events', events);
app.use('/invitations', invitations);

app.get('/', (req, res) => {
  res.render('welcome');
});

app.listen(port);

