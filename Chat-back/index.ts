import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8000 }, () =>
  console.log(`WS started on port 8000`)
);

wss.on("connection", (ws) => {
  try {
    ws.on("message", (msg: string) => {
      msg = JSON.parse(msg);
      broadcastMessage(msg);
    });
  } catch (error) {
    console.log(error);
  }
});
function broadcastMessage(message: string): void {
  try {
    wss.clients.forEach((client: any) => {
      client.send(JSON.stringify(message));
    });
  } catch (error) {
    console.log(error);
  }
}
