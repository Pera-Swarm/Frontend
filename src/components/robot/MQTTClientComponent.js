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

    componentWillUnmount() {
        console.log('MQTT:disconnect');
        this.client.disconnect()
    }

    componentDidMount() {
        this.client = new MQTT.Client(
            mqttConfig.host,
            Number(mqttConfig.port),
            mqttConfig.path,
            mqttConfig.options.clientId
        );

        this.client.connect({
            userName: mqttConfig.options.username ||'swarm_user',
            password: mqttConfig.options.password ||'swarm_usere15',
            reconnect: true,
            useSSL: true,
            cleanSession: false,

            onSuccess: () => {
                console.log('MQTT:connected');

                // Default subscription
                this.client.subscribe(TOPIC_INFO);

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
                this.setState({robots: createData},() => {
                    console.log(this.state);
                });

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
                this.setState({robots: nextRobots},() => {
                    console.log(this.state);
                });
            } catch (e) {
                console.error(e);
            }

        } else if (topic === TOPIC_INFO) {
            //console.log('MQTT: ' + topic + ' > ' + msg);
            try {
                // Robots bulk or individual location update logic
                const locInfoData = JSON.parse(msg);
                this.setState({robots: locInfoData},() => {
                    console.log(this.state);
                });
            } catch (e) {
                console.error(e);
            }
            
        }
    };

    render() {
        return '';
    }
}
export default MQTTClient;
