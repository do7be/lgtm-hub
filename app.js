const express = require('express');
const sanitize = require('validator');
const request = require ('request');
const compression = require('compression')
const manifest = require('./manifest.json')
const redis = require('then-redis')
const kvs = redis.createClient(process.env.REDIS_URL)
const bodyParser = require('body-parser')
let app = express();
let server = require('http').createServer(app);

// server configure
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(compression({level: 6}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url)
    } else if (req.headers.host === 'lgtm-hub.herokuapp.com') {
      return res.redirect('https://' + process.env.SERVER_ADDRESS + req.url)
    } else {
      return next()
    }
  } else {
    return next()
  }
})

let env = process.env.NODE_ENV || 'development';
if ('development' == env) {
}

// server listen
server.listen(app.get('port'), function () {
  console.log('Server listening at port %d', app.get('port'));
});

const jsPath = {
  vendor: `/js/dist${manifest['vendors~index.js']}`,
  index: `/js/dist${manifest['index.js']}`
}

// route
app.get('/', function (req, res) {
  res.render('index', { production: env === 'production', jsPath })
})

const redisKey = 'history'
app.get('/recommend', async function (req, res) {
  const recommend = await kvs.lrange(redisKey, 0, -1) || []
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(recommend))
})
app.get('/random', function (req, res) {
  let tasks = [
    getJsonLgtmin(),
    getJsonLgtmin(),
    getJsonLgtmin(),
  ]
  Promise.all(tasks).then(function(results) {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(results))
  })
})
app.post('/select', async function (req, res) {
  const imgUrl = req.body.img

  const recommend = await kvs.lrange(redisKey, 0, -1) || []
  if (checkDataImg(imgUrl, recommend)) {
    const filteredImgUrl = sanitize.toString(imgUrl)
    await kvs.rpush(redisKey, filteredImgUrl)
    if ((await kvs.llen(redisKey)) > 24) {
      await kvs.lpop(redisKey)
    }
    await kvs.expireat(redisKey, parseInt((new Date) / 1000, 10) + 60 * 60 * 24 * 10) // 10日キャッシュ
  }
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.end()
})

// request for get images to lgtm.in
function getJsonLgtmin() {
  return new Promise(function(resolve) {
    request(
      {
        method: 'GET',
        uri: 'http://www.lgtm.in/g',
        gzip: true,
        rejectUnauthorized: false,
        headers: {
          "accept": "application/json, */*",
          "accept-encoding": "gzip, deflate",
          "user-agent": "runscope/0.1",
          "connection": "keep-alive"
        }
      }
    , function (error, response, body) {
        resolve(JSON.parse(body));
    });
  });
}

// sanitizing
function checkDataImg (img, recommend) {
  if (img.match(/"/) !== null || img.match(/'/) !== null) {
    return false;
  }

  if (img.match(/^http:\/\/lgtm.in\/p\//) === false) {
    return false;
  }

  // check already contain
  if (recommend.includes(img)) {
    return false
  }

  return true;
}
