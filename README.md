> ⚠️ This documentation outlines unimplemented features! ⚠️

# BattleshipJS
## Server + Client

BattleshipJS is written in NodeJS and uses express for the web server and api requests, sass for styling, and ejs for html generation. Any client can connect and play using the API documented. The server logic acts much like actual Battleship and simply replies whether the shot missed, hit, or sunk. The rendering is all client side.

## API

### Public:

**GET** <domain>/singleplayer/highscore/
(Returns most points + username & most wins + username)

**GET** <domain>/multiplayer/open_rooms
(Returns array of discoverable rooms with ids, players, & created timestamp)

**POST** <domain>/multiplayer/create_account
(Creates account and sends a uuid back for authorization purposes)

Required:
- `username: <username>`


### Private:

> All private requests require an authorization cookie. The cookie must be named `uuid` and contain the user's uuid which the server generates and sends back to the client on a create account request.

**POST** <domain>/multiplayer/new_room

Required:
- `username: <username>`
(automatically adds user to room)

Optional:
- `discoverable: false` *(default is true)*
(Disables api room discovery but anyone with the link can join)
- `opponent_username: <opponent username>`
(Only users with matching username can join)
