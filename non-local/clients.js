const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
let client;
const topic = "chat001"



function connectSubscribeAndPublish(){

  const clientId = "client" + Math.random().toString(36).substring(7);
  const hostURL = `http://${host}:${port}`;

  client = mqtt.connect(hostURL,{protocolVersion:5});

  client.on('connect', () => {
    console.log(`Connected, Your id is ${clientId}`);
      client.subscribe(topic, {nl:true},() => {
      client.publish(topic,`New Member Added: ${clientId}`);
    });
  });
}

connectSubscribeAndPublish();


client.on('message', (topic, message) => {
  console.log(message.toString());
});


let readline = require('readline');
let input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

input.on('line', function (msg) {
  client.publish(topic, msg);
});