const { WebSocketServer } = require("ws")
const chokidar = require("chokidar")

const server = new WebSocketServer({ port: 3001 })
const watchCallbacks = []

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
    const index = watchCallbacks.findIndex(onChange)
    watchCallbacks.splice(index, 1)
  })
})

function shutdown() {
  server.close()
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
