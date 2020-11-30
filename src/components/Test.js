import React, { Component } from 'react';
import mqttConfig from '../config/mqttConfig';
import MQTT from 'paho-mqtt';
import * as mqtt from 'react-paho-mqtt';

import { Button } from 'reactstrap';

const TOPIC_INFO = 'v1/localization/info';
const TOPIC_CREATE = 'v1/gui/create';
const TOPIC_CHANGE_COLOR = 'v1/sensor/color';
const _options = {};

class Test extends Component {
    constructor(props) {
        super(props)
        //console.log(mqttConfig);
        var client = new MQTT.Client(mqttConfig.host, Number(mqttConfig.port), "/socket.io", mqttConfig.options.clientId);

        //if(client.connect !== undefined){
        client.connect({
            userName: "swarm_user",
            password: "swarm_usere15",
            reconnect: true,
            useSSL: true,
            cleanSession: false,
            onSuccess: () => {
                client.subscribe("test");
                console.log('MQTT: connected check');
                //onMessageArrived = onMessageArrived;
                //onConnectionLost = onConnectionLost
            },
            onFailure: () => {
                console.log('MQTT: connection failed');
            },
        });
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    create(id, x, y, heading, callback) {
        console.log("create robot");
    }

    delete() {
        console.log("delete robot");
    }


    render() {
        return (
            <div className="App">
                <Button variant="primary" onClick={this.create}>Create</Button>
                <br></br><br></br>
                <Button variant="primary" onClick={this.delete} >Delete</Button>
                <br></br><br></br>
            </div>
        );
    }
}

export default Test;