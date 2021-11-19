const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.Server(app);
const io = socketio(server);
const session = require('express-session');
const title = 'Buffer Buzzer'

let data = {
  users: new Set(),
  buzzes: new Set(),
}

const getData = () => ({
  users: [...data.users],
  question: "",
  buzzes: [...data.buzzes].map(b => {
    const [ name, team ] = b.split('-')
    return { name, team }
  })
})

app.use(express.static('public'))
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));
app.set('view engine', 'pug')



var auth = function(req, res, next) {
  if (req.session && req.session.user === "admin" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.get('/', (req, res) => res.render('index', { title }))
app.get('/host', auth,(req, res) => res.render('host', Object.assign({ title }, getData())))

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
 
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send("<h1>Login Failed</h1>");
  } else if(req.query.username === "admin" || req.query.password === "adminpassword") {
    req.session.user = "admin";
    req.session.admin = true;
    res.redirect("/host");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("<h1>logout success!</h1>");
});


io.on('connection', (socket) => {
  socket.on('join', (user) => {
    data.users.add(user.id)
    io.emit('active', [...data.users].length)
    console.log(`${user.name} joined!`)
  })

  socket.on('buzz', (user) => {
    data.buzzes.add(`${user.name}-${user.team}`)
    io.emit('buzzes', [...data.buzzes])
    console.log(`${user.name} buzzed in!`)
  })

  socket.on('clear', () => {
    data.buzzes = new Set()
    io.emit('buzzes', [...data.buzzes])
    console.log(`Clear buzzes`)
  })

  socket.on('clearQuestion', (q) => {
    console.log("Question Cleared")
    io.emit('question',{questionText:q.quest})
  })

  socket.on('question', (q) => {
    console.log(q.quest);
    io.emit('question',{questionText:q.quest})
  })
 
})

server.listen((process.env.PORT || 3000), () => console.log('Listening on 3000'));