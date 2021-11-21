import createError from 'http-errors'
import express from 'express'
import cors from 'cors'

import connection from './models/db.js'
import { PORT } from './config/server.config.js'
import registrationRoutes from './routes/registration.js'

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('this is the home page which is not using currently')
});

app.use('/api', registrationRoutes)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`port is listening at http://localhost:${PORT}`)
})

export default app

