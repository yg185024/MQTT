const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
let client;

const clientId = "client" + Math.random().toString(36).substring(7);
const hostURL = `http://${host}:${port}`;

client = mqtt.connect(hostURL,{protocolVersion:5});
client.on('connect', () => {
    console.log(`Connected, Your id is ${clientId}`);
});


client.subscribe('#'); // Answer


client.on('message', (topic, message) => {
  console.log(`${topic} : ${message.toString()}`);
});

