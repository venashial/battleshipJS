let connection

function open_websocket_connection() {
  const url = 'wss://'+ window.location.hostname +  window.location.pathname + '/ws?user=' + "f394ug394"
  connection = new WebSocket(url)
  
  connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
  }
  
  connection.onopen = () => {
    connection.send('Connected!')
    console.log("Opened Websocket Connection")
  }
}

open_websocket_connection()

function send_websocket_message(message) {
  if (connection.readyState == WebSocket.CLOSED) {
    open_websocket_connection()
    connection.onopen = () => {
      connection.send(message)
    }
  } else {
  connection.send(message)
  }
}

connection.onmessage = e => {
  console.log(e.data)
}