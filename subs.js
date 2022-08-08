const http = require('http');
const mqtt = require('mqtt');

var client = mqtt.connect('mqtt://broker.hivemq.com');

const hostname = '127.0.0.1';
const port = 3000;

client.on('connect', function () {

    const readline = require("readline");


    function input() {

        var q1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        q1.question("Press S for stable weight: ", function (answer) {
            client.publish('driver_command', `${answer}`)
            console.log("Interface Closed");
            q1.close();
        });
    }

    input();
    client.subscribe("instrument_data");
    console.log("client has succfully subscribed!!");

    const topic = 'instrument_data';
    client.on('message', function (topic, message) {
        console.log(message.toString());
        if (message.toString())
            input();
        else
            input();
    })


})
