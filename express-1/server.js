const express = require('express');
const app = express();

const port = 5555;

class MyError extends Error {

}

// Используем static в express
app.use('/public', express.static('public'));
// Используем JSON
app.use(express.json());

// регистрация middleware
app.use((req, res, next) => {
  console.log(`Request path: ${req.path}`);
  console.log(`Request path: ${req.path}`);

  // next - чтобы пробросить запрос дальше, на выход из middleware
  next();
})

// Request auth
app.use((req, res, next) => {
  // req - информация о запросе
  if (req.headers?.authorization === 'access-token') {
    req.user = { username: 'superadmin' };

    // next - чтобы пробросить запрос дальше серверу
    return next();
  }

  // res - объект-ответ клиенту
  res.status(401).send({ error: true, message: 'Authorization error' });
});

app.post('/post', function (req, res) {
  console.log(`body.name: ${req.body.name}`);
  res.send('Post');
});

app.post('/ping', function (req, res) {
  res.send(req.body);
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});

// name - передается как параметр в адресной строке
app.get('/hello/:name', function (req, res) {
  console.log(`username: ${req.user.username}`);
  res.send(`hello ${req.params.name}`);
});

app.get('/error', function (req, res) {
  throw new MyError('route error');
});

// middleware обработчик ошибок после обработки всех endpoints
app.use((err, req, res, next) => {
  if (err instanceof MyError) {
    console.log('my error');
  }
  if (err) {
    return res.status(500).send({ error: err.message });
  }
  next();
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server started on port ${port}`);
});