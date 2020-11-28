import React,{ Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { HashRouter } from 'react-router-dom';
import mqttConfig from './config/mqttConfig';

import MQTT from 'paho-mqtt';

class App extends Component{

    constructor(props){
        super(props)

        //console.log(mqttConfig);

        var client = new MQTT.Client(mqttConfig.host, Number(mqttConfig.port), "/socket.io",mqttConfig.options.clientId);

        //if(client.connect !== undefined){
        client.connect({
            userName: "swarm_user",
            password: "swarm_usere15",
            reconnect: true,
            useSSL: true,
            cleanSession : false,
            onSuccess: () => {
                client.subscribe("test");
                console.log('MQTT: connected');

                //onMessageArrived = onMessageArrived;
                //onConnectionLost = onConnectionLost

            },
            onFailure: ()=>{
                console.log('MQTT: connection failed');
            }

        });
    }

    render(){
        return (
            <HashRouter basename=''>
                <div>
                    <Main />
                </div>
            </HashRouter>
        );
    }
}

export default App;
