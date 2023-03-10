import http from "http";
import express from "express";
import ShareDB from "sharedb";
import WebSocket from "ws";
import WebSocketJSONStream from "@teamwork/websocket-json-stream";

const backend = new ShareDB();

// Create initial document then fire callback
function start(callback: () => void) {
  const connection = backend.connect();
  const doc = connection.get("ot-example", "counter");
  doc.fetch(err => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ num: 0 }, callback);
      return;
    }
    callback();
  });
}

function server() {
  const app = express();
  app.use(express.static("build"));
  const server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", ws => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(3000);
  console.log("Listening on http://localhost:3000");
}

start(server);
