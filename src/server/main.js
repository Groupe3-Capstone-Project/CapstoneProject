require('dotenv').config()
const PORT = 4000;
const express = require('express');
const router = require('vite-express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:4000' }));

// app.use(function (req, res, next) {
//   console.log('CORS Middleware Executed');
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

const client = require('./db/client')
client.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

router.listen(app, PORT, () =>
  console.log('Server is listening on port:', PORT)
);

module.exports = router;