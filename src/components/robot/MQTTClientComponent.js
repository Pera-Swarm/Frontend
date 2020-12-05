import React, { Component } from 'react';
import MQTT from 'paho-mqtt';
// import { Robot, VRobot } from 'pera-swarm;

import mqttConfig from '../../config/mqttConfig';
import { TOPIC_INFO, TOPIC_CREATE, TOPIC_DELETE } from '../../config/topics';
import { Button } from 'reactstrap';

class MQTTClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            robots: []
        };
    }

    componentDidMount() {
        console.log('Mounted');

        console.log(mqttConfig);

        this.client = new MQTT.Client(
            'swarm-gui.tk',
            Number(mqttConfig.port),
            '/socket.io',
            mqttConfig.options.clientId
        );

        // console.log(this.client);

        this.client.connect({
            userName: 'swarm_user',
            password: 'swarm_usere15',
            reconnect: true,
            useSSL: true,
            cleanSession: false,
            onSuccess: () => {
                this.client.subscribe(TOPIC_INFO);
                console.log('MQTT: connected');
                this.client.onMessageArrived = this.onMessageArrived;
                this.client.onConnectionLost = this.onConnectionLost;
            },
            onFailure: () => {
                console.log('MQTT: connection failed');
            }
        });
    }

    onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log('MQTT: onConnectionLost:' + responseObject.errorMessage);
            console.log('MQTT: reconnecting');
        }
    };

    onMessageArrived = (packet) => {
        const msg = packet.payloadString.trim();
        const topic = packet.destinationName;

        if (topic === TOPIC_CREATE) {
            console.log('MQTT: ' + topic + ' > ' + msg);
            try {
                const createData = JSON.parse(msg);
                // Robot create logic
                // Can create Robots or VRobots
                this.setState(
                    {
                        robots: createData
                    },
                    () => {
                        console.log(this.state);
                    }
                );

            } catch (e) {
                console.error(e);
            }
        } else if (topic === TOPIC_DELETE) {
            try {
                // Robot delete logic
                // Can delete Robots or VRobots
                const deleteData = JSON.parse(msg);
                const { robots: prevRobots } = this.state;
                const nextRobots = prevRobots.forEach((item) => {
                    if (item.id !== deleteData.id) {
                        return item;
                    }
                });
                this.setState(
                    {
                        robots: nextRobots
                    },
                    () => {
                        console.log(this.state);
                    }
                );
            } catch (e) {
                console.error(e);
            }
        } else if (topic === TOPIC_INFO) {
            //console.log('MQTT: ' + topic + ' > ' + msg);
            try {
                // Robots bulk or individual location update logic
                const locInfoData = JSON.parse(msg);
                this.setState(
                    {
                        robots: locInfoData
                    },
                    () => {
                        console.log(this.state);
                    }
                );
            } catch (e) {
                console.error(e);
            }
        }
    };

    render() {
        return (
            <div className="App">
                <Button variant="primary" >Create</Button>
                <br></br><br></br>
                <Button variant="primary">Delete</Button>
                <br></br><br></br>
            </div>

        );
    }
}
export default MQTTClient;
