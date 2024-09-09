import express from 'express';
import createHomepageTemplate from './views/index.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://html-mock.fly.dev/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
 
// routes
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});

app.get('/demo/3', async (req, res) => {
  await new Promise(r => setTimeout(r, 5000));

  let result;
  await import(`./views/demo3.js`).then(module => {
    result = module.demo;
  })

  res.send(result())
})

app.get('/demo/:id', async (req, res) => {
  const { id } = req.params

  let result;
  await import(`./views/demo${id}.js`).then(module => {
    result = module.demo;
  })

  res.send(result())
})

app.post('/demo3-post-response', (req, res) => {
  const { fname, lname } = req.body;

  res.send(`Hello ${fname} ${lname}`)
  // res.send(`<span>Hello ${fname} ${lname}</span>`)
})

app.get('/demo4-1', (req, res) => {
  res.send('<div id="demo4" class="demo4">New Content</div>')
})

app.get('/error404', (req, res) => {
  res.status(404)
  res.send('<span>Resource not found</span>')
})

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});