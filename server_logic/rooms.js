//require
const fs = require('fs');

async function create_room() {
 let new_id = await create_room_id()
 console.log(new_id)
 return new_id
}

function join_room(room_id, user) {

    console.log(room_id)
     //Update room's file
     fs.readFile("database/rooms/" + room_id + ".json", (err, data) => {
     if (err) throw err;
     let current_room_data = JSON.parse(data);

     current_room_data.players.push(user)

     current_room_data.scores[user] = {
       hits: 0,
       misses: 0
     }

     current_room_data.boards[user] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    
    fs.writeFile("database/rooms/" + room_id + ".json", JSON.stringify(current_room_data), function(err) {
      if (err) throw err;
      console.log("Wrote data for room: " + room_id + ", for user: " + user)
    });


    //Update "Open Rooms" API
    if (current_room_data.players.indexOf(user) != -1) {
    fs.readFile("database/api/open_rooms.json", (err, data) => {
     if (err) throw err;
     let current_open_rooms = JSON.parse(data);

     let index = current_open_rooms.findIndex(x => x.id == room_id);

     //console.log(index)

    current_open_rooms[index].players = current_open_rooms[index].players + 1
    
    fs.writeFile("database/api/open_rooms.json", JSON.stringify(current_open_rooms), function(err) {
      if (err) throw err;
      console.log("Updated API for room: " + room_id + ", for user: " + user)
    });

    });
    }

    });
}

function leave_room(room_id, user) {
  //Check if room exists
  fs.access("database/rooms/" + room_id + ".json", fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  }

    //Update room's file
    fs.readFile("database/rooms/" + room_id + ".json", (err, data) => {
     if (err) throw err;
     let current_room_data = JSON.parse(data);

     current_room_data.players = current_room_data.players.filter(e => e !== user)

     delete current_room_data.scores[user]

     delete current_room_data.boards[user]
    
    fs.writeFile("database/rooms/" + room_id + ".json", JSON.stringify(current_room_data), function(err) {
      if (err) throw err;
      console.log("Wrote data for room: " + room_id + ", for user: " + user)
    });


    //Update "Open Rooms" API
    if (current_room_data.players.indexOf(user) != -1) {
    fs.readFile("database/api/open_rooms.json", (err, data) => {
     if (err) throw err;
     let current_open_rooms = JSON.parse(data);

     let index = current_open_rooms.findIndex(x => x.id == room_id);

    current_open_rooms[index].players = current_open_rooms[index].players - 1
    
    fs.writeFile("database/api/open_rooms.json", JSON.stringify(current_open_rooms), function(err) {
      if (err) throw err;
      console.log("Updated API for room: " + room_id + ", for user: " + user)
    });

    });
    }

    //Close room if now empty
    if (current_room_data.players.length == 0)
       close_room(room_id)
    });

  })
}

function close_room(room_id, user) {
  fs.unlink("database/rooms/" + room_id + ".json", (err) => {
  if (err) throw err;
  console.log("Deleted room: " + room_id);
     fs.readFile("database/api/open_rooms.json", (err, data) => {
     if (err) throw err;
     let current_open_rooms = JSON.parse(data);

     let index = current_open_rooms.findIndex(x => x.id == room_id);

      current_open_rooms.splice(index, 1);
    
    fs.writeFile("database/api/open_rooms.json", JSON.stringify(current_open_rooms), function(err) {
      if (err) throw err;
      console.log("Updated API for room: " + room_id + ", for user: " + user)
    });

    });
  });

}

//Exported functions
module.exports = { create_room, join_room, leave_room, close_room };

//Internal Functions
function make_id(length) {
  let id = ""
   
  for (var n = 0; n < length; n++) {
   var min = Math.ceil(0);
   var max = Math.floor(9);
   var result =  Math.floor(Math.random() * (max - min + 1)) + min;

   id = id + result
  }

  return id;
}

function create_room_id() {

    //First read current set of rooms
    fs.readFile('database/api/open_rooms.json', (err, data) => {
    if (err) throw err;

    let open_room_objects = JSON.parse(data);
    let open_rooms_array = []

    //Sort out the junk to only the ids
    for (var r = 0; r < open_room_objects.length; r++) {
      open_rooms_array.push(open_room_objects[r].id)
    }

    let new_id = ""

    //Loop to keep making new ids
    while (new_id == "") {
      new_id = make_id(4)

      //Checks if id exists
      for (var r = 0; r < open_rooms_array.length; r++) {
        if (new_id == open_rooms_array[r]) {
          //If the id exists then it just sets it back to nothing
          new_id = ""
          break
        }
      }
    }

    let public_room = {
      "id": new_id,
      "players": 0,
      "created": Date.now()
    }

    open_room_objects.unshift(public_room)

    fs.writeFile("database/api/open_rooms.json", JSON.stringify(open_room_objects), function(err) {
      if (err) throw err;
      console.log("Updated 'open_rooms' API for room: " + new_id);
      create_room_file(new_id)
    });

    })
}

function create_room_file(room_id) {
      let new_room = {
        id: room_id,
        players: [],
        boards: {},
        scores: {},
        player_turn: "",
        winner: ""
      }

      fs.writeFile("database/rooms/" + room_id + ".json", JSON.stringify(new_room), function(err) {
      if (err) throw err;
      console.log("Created in database room: " + room_id)
      return room_id
      });
}