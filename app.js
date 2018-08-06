'use strict'
const express = require('express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const sanitize = require('validator')
const request = require ('request')
const compression = require('compression')
const manifest = require('./manifest.json')
const bodyParser = require('body-parser')
let app = express();

// server configure
app.set('view engine', 'jade');
app.set('views', 'views');

app.use(compression({level: 6}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const AWS = require('aws-sdk')
const dynamoConfig =
  process.env.NODE_ENV === 'development' ? {
    region: 'ap-northeast-1',
    endpoint: "http://dynamodb:8000"
  } : {
    region: 'ap-northeast-1'
  }
const dynamo = new AWS.DynamoDB.DocumentClient(dynamoConfig)

// app.use(function (req, res, next) {
//   if (process.env.NODE_ENV === 'production') {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect('https://' + req.headers.host + req.url)
//     } else if (req.headers.host === 'lgtm-hub.herokuapp.com') {
//       return res.redirect('https://' + process.env.SERVER_ADDRESS + req.url)
//     } else {
//       return next()
//     }
//   } else {
//     return next()
//   }
// })

let env = process.env.NODE_ENV
if (env === 'development') {
  const server = require('http').createServer(app);
  app.set('port', (process.env.PORT || 5000));
  // server listen
  server.listen(app.get('port'), function () {
    console.log('Server listening at port %d', app.get('port'))
  })
} else {
  app.use(awsServerlessExpressMiddleware.eventContext())
}

const jsPath = {
  vendor: `/js/dist${manifest['vendors~index.js']}`,
  index: `/js/dist${manifest['index.js']}`
}

// route
app.get('/', (req, res) => {
  res.render('index', { production: env === 'production', jsPath })
})

app.get('/js/index', (req, res) => {
  res.sendFile(`${__dirname}/public${jsPath.index}`)
})

app.get('/js/vendor', (req, res) => {
  res.sendFile(`${__dirname}/public/${jsPath.vendor}`)
})

app.get('/img/favicon', (req, res) => {
  res.sendFile(`${__dirname}/public/img/favicon.ico`)
})

app.get('/css/style', (req, res) => {
  res.sendFile(`${__dirname}/public/css/style.css`)
})

const redisKey = 'history'
app.get('/recommend', async function (req, res) {
  const history = await getHistory()
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(JSON.stringify(history))
})
app.get('/random', async function (req, res) {
  let tasks = [
    getJsonLgtmin(),
    getJsonLgtmin(),
    getJsonLgtmin(),
  ]
  const results = await Promise.all(tasks)
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(JSON.stringify(results))
})
app.post('/select', async function (req, res) {
  const imgUrl = req.body.img
  const recommend = await getHistory()
  if (checkDataImg(imgUrl, recommend)) {
    const filteredImgUrl = sanitize.toString(imgUrl)
    const newHistory = recommend.concat([filteredImgUrl]).slice(-24)
    const params = {
      TableName: 'lgtm',
      Key: {
        id: 1,
      },
      ExpressionAttributeValues: {
        ':newHistory': newHistory,
      },
      ExpressionAttributeNames: {
        '#n': 'history',
      },
      UpdateExpression: 'SET #n = :newHistory'
    }
    await new Promise ((resolve, reject) => {
      dynamo.update(params, function(err, data) {})
    })
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
          // "user-agent": "runscope/0.1",
          // "connection": "keep-alive"
        },
        timeout: 300000,
      }
    , function (error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function getHistory () {
  const params = {
    TableName: 'lgtm',
    Key: {
      id: 1,
    }
  }
  return new Promise ((resolve, reject) => {
    dynamo.get(params, function(err, data) {
      console.log(data)
      console.log(err)
      resolve(data.Item.history)
    })
  })
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

module.exports = app
