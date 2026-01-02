import chokidar from "chokidar"
import { WebSocketServer } from "ws"

const server = new WebSocketServer({ port: 3001 })
let watchCallbacks: Array<() => void> = []

chokidar.watch("./public").on("all", (event) => {
  if (event === "change") {
    watchCallbacks.forEach((cb) => cb())
  }
})

server.on("connection", function connection(socket) {
  socket.on("error", console.error)

  const onChange = () => socket.send("refresh")
  watchCallbacks.push(onChange)
  socket.on("close", function close() {
    watchCallbacks = watchCallbacks.filter((cb) => cb !== onChange)
  })
})

function shutdown() {
  server.close()
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
