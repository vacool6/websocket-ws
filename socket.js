const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(express);
const socketServer = new WebSocket.Server({ server });

socketServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    socketServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen("8080", () => console.log("Chat room live at 8080"));

// socketServer.on("connection", function connection(ws) {
//   ws.on("message", function incoming(data) {
//     socketServer.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });
