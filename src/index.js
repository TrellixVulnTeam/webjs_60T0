const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 5000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));

// Teamplate
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    // path to your layout
    layoutsDir: path.join(__dirname, 'resources/views/layouts'),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, 'resources/views/partials'),
    ],
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// route init
route(app);

// app.get('/', (req, res) => {
//   res.render('home')
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
