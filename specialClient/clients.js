const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
let client;
let topic = "random001" + Math.random().toString(36).substring(2,5);;


const clientId = "client" + Math.random().toString(36).substring(7);
const hostURL = `http://${host}:${port}`;

client = mqtt.connect(hostURL,{protocolVersion:5});
client.on('connect', () => {
    console.log(`Connected, Your id is ${clientId}`);
    console.log(`You are subscribed to ${topic}`);
});


client.on('message', (topic, message) => {
    console.log(`Got the response : ${message.toString()}`);
    
});
  

let readline = require('readline');
let input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
input.on('line', function (msg) {
    client.publish(topic, msg);
});
