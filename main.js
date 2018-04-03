const http = require('http')
const child_process = require('child_process')
const dgram = require('dgram');

const PORT = 8554
const HOST = '10.5.5.9'

const client = dgram.createSocket('udp4');
const message = new Buffer('_GPHD_:0:0:2:0.000000\n');


http.get(`http://${HOST}/gp/gpControl/execute?p1=gpStream&a1=proto_v2&c1=restart`)

setTimeout(() => {
  const cp = child_process.exec(`ffplay -fflags nobuffer -f:v mpegts -probesize 8192 udp://${HOST}:${PORT}`)
  cp.stderr.pipe(process.stderr)
  cp.stdout.pipe(process.stdout)
}, 1000)

setInterval(() => {
  client.send(message, 0, message.length, PORT, HOST)
}, 1000)
