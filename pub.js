const http = require('http');
const mqtt = require('mqtt');

var client = mqtt.connect('mqtt://broker.hivemq.com');

const hostname = '127.0.0.1';
const port = 3000;

client.on('connect', function () {

    client.subscribe("driver_command");

    console.log("client has succfully subscribed!!");

    function publishStableWeight(b) {
        var random = Math.random();
        console.log('received command ' + b + 'Math random funtion: ', random);
        if (random < 0.8000) {
            client.publish('instrument_data', 'The weight is : ' + (random * 100).toString() + ' gm.')
        }
        else if (0.8000 < random < 0.9000) {
            client.publish('instrument_data', "Command not executable.")
        }
        else if (0.9000 < random < 0.9500) {
            client.publish('instrument_data', "Balance in Underload range.")
        }
        else if (0.9500 < random < 0.9900) {
            client.publish('instrument_data', "Balance in Overload range.");
        }
    }

    const topic = 'driver_command';

    client.on('message', function (topic, message) {
        console.log('subscribed message is : ' + message.toString());

        if (message.toString() == "S")
            publishStableWeight('Sfunction');
        else
            publishStableWeight('Yfunction');
    })
})
