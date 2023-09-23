require('dotenv').config()
const { PORT = 3000 } = process.env;
const express = require('express');
const router = require('vite-express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:8000' }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

app.use(express.static('public'))

// const db = require('./db/client')
// db.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

router.listen(app, PORT, () =>
  console.log('Server is listening on port:', PORT)
);

module.exports = router;