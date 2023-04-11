const mqtt = require('mqtt');
const host = "127.0.0.1";
const port = "1883";
let client;
const topic = "server/request";

const clientId = "client" + Math.random().toString(36).substring(7);
const hostURL = `http://${host}:${port}`;

client = mqtt.connect(hostURL,{protocolVersion:5});
client.on('connect', () => {
    console.log(`Connected You are the main`);
    client.subscribe(topic, {nl:true});
});


client.on("message", function (topic, message,packet ){
      
      client.publish(packet.properties.responseTopic, getCurrentTime());
      console.log(`Sent the response to ${packet.properties.responseTopic}`);
    }
);


// Time API
function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
  