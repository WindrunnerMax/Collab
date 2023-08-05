const WebSocket = require("ws");
const http = require("http");
const wss = new WebSocket.Server({ noServer: true });
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = ws => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

module.exports = server;
// server.listen(3001);
