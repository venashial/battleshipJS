> Warning: ⚠️ This documentation outlines unimplemented features! ⚠️

# BattleshipJS

The Server + Client dynamic duo!

BattleshipJS is written in NodeJS and uses express for the web server and api requests, sass for styling, and ejs for html generation. Any client can connect and play using the API documented. The server logic acts much like actual Battleship and simply replies whether the shot missed, hit, or sunk. The rendering is all client side.

## Game

### Game board
The game board is represented as an array. The types of value a coordinate can contain are as follows:

`0` - untouched\
`1` - hit\
`c` - carrier\
`b` - battleship\
`d` - destroyer\
`s` - submarine\
`p` - patrol boat

> Note: When referring to the opposing teams ships, any ship defined coordinate (like "c") means the ship is sunken.

### Ships
There are 5 ships in classic battleship:

- One Carrier (5 long)
- One Battleship (4 long)
- One Destroyer (3 long)
- One Submarine (3 long)
- One Patrol Boat (2 long)

## API

### Public:

#### Singleplayer highscores
**GET** <domain>/singleplayer/highscore/
(Returns most points + username & most wins + username)

#### Multiplayer rooms
**GET** <domain>/multiplayer/open_rooms
(Returns array of discoverable rooms with ids, players, & created timestamp)

#### Create account
**POST** <domain>/multiplayer/create_account
(Creates account and sends a uuid back for authorization purposes)

Required:
- `username: <username>`

<br >

### Private:

> Note: All private requests require an authorization cookie. The cookie must be named `uuid` and contain the user's uuid which the server generates and sends back to the client on a create account request.

#### Create new room
**POST** <domain>/multiplayer/new_room
(User is automatically added to room)

Optional:
- `discoverable: false` *(default is true)*
(Disables api room discovery but anyone with the link can join)
- `opponent_username: <opponent username>`
(Only users with matching username can join)

#### Join existing room
**POST** <domain>/multiplayer/<room_id>/join_room
(User is automatically added to room)

#### Place ships
**POST** <domain>/multiplayer/<room_id>/place_ships

Required:
- `game_board: <game_board>`

#### Guess
**POST** <domain>/multiplayer/<room_id>/guess

Required:
- `location: [<x>, <y>]`
