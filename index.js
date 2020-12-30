//require
const fs = require('fs');

//Express
const express = require('express')
const app = express()
app.use(express.static('public')); //Allow access

//Allow CORS
var cors = require('cors');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Imported functions
const ro = require("./server_logic/rooms");

//Sass
var sass = require('node-sass');

sass.render({
  file: "assets/scss/main.scss",
  outFile: "public/css/style.css",
}, function(error, result) { // node-style callback from v3.0.0 onwards
  if (!error) {
    console.log("Sass compiled!")
    fs.writeFile("public/css/style.css", result.css, function(err) {
      if (!err) {
        console.log("Sass written!")
      } else {
        console.log(err)
      }
    });
  } else {
    console.log(error)
  }
});

//EJS
app.set('view engine', 'ejs')

//Allow CORS
app.use(cors());

app.get('/', function(req, res) {
  //Render index
  res.render('pages/main_menu', {
    title: "Main Menu",
    tagline: "Play Battleship",
    description: "With singleplayer and multiplayer versions you can play any time! Invite friends with a link to play from anywhere!"
  });
})

app.get('/singleplayer', function(req, res) {
  //Render index
  res.render('pages/singleplayer', {
    title: "Singleplayer",
    tagline: "Play Battleship Singleplayer",
    description: "this is a boring homepage"
  });
})

app.get('/multiplayer/:room_id', function(req, res) {
  //Render index
  res.render('pages/multiplayer', {
    title: "Multiplayer",
    tagline: "You've been invited to room " + req.params.room_id,
    description: "Follow this link to play multiplayer Battleship online!",
    room_id: req.params.room_id
  });
})

app.get('/multiplayer/', function(req, res) {
  //Render index
  res.redirect('/#multiplayer');
})

//Get all open rooms and relevant data
app.get('/api/open_rooms', function(req, res) {
  fs.readFile('database/api/open_rooms.json', (err, data) => {
    if (err) throw err;
    let open_rooms = JSON.parse(data);
    res.json(open_rooms)
  });
})


//Make new room
app.get('/api/new_room', function(req, res) {
    res.json(ro.create_room())
})

//Object containing all websocket connections
let connected_players = {}

app.ws('/multiplayer/:room_id/ws/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log("Received Message: '" + msg + "', from room: " + req.params.room_id + ", from user: " + req.query.user)

  if (msg.includes("Connected!")) {
    //Add client to connections
    connected_players[req.query.user] = ws

    //Update API and room database
    ro.join_room(req.params.room_id, req.query.user)

  } else if (msg.includes("Disconnected!")) {
    //Remove client to connections
    delete connected_players[req.query.user]

    //Update API and room database
    ro.leave_room(req.params.room_id, req.query.user)
  } else if (msg.includes("Submit ships:")) {
    //add ships to json

  } else if (msg.includes("Send guess:")) {
    //check guess
    connected_players[req.query.user].send("Got it!");
}

    //ws.send(msg);
  });
});


app.listen(3000, function() {
  console.log('Webpage listening on port 3000!')
})
