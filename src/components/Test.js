import React, { Component } from 'react';
import mqttConfig from '../config/mqttConfig';
import MQTT from 'paho-mqtt';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client : new MQTT.Client(mqttConfig.host, Number(mqttConfig.port), "/socket.io",mqttConfig.options.clientId),
            userName:'',
            password:'',
            reconnect:'',
            useSSL:'',
            cleanSession:'',
            onSuccess:'',
            onFailure :''
        }
        this.connect = this.connect.bind(this);
    }
    connect() {
        this.userName = "swarm_user";
        this.password = "swarm_usere15";
        this.reconnect = true;
        this.useSSL = true;
        this.cleanSession = false;
        this.onSuccess = () => {
            this.client.subscribe("test");
            console.log('MQTT: connected');

            //onMessageArrived = onMessageArrived;
            //onConnectionLost = onConnectionLost

        };
        this.onFailure = () => {
            console.log('MQTT: connection failed');
        };

    }

    
    render() {
        return (
            <div className="App">
                {this.connect}
            </div>
        );
    }
}
export default Test;

/*

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'www.javatpoint.com'
        }
        this.connect = this.connect.bind(this);
    }
    connect() {
        console.log("check");
        console.log(this.state.data);

    }
    render() {
        return (
            <div className="App">
                <h2>React Constructor Example</h2>
                <input type="text" value={this.state.data} />
                <button onClick={this.connect}>Please Click</button>
            </div>
        );
    }
}

*/