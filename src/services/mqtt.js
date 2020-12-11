const MQTT = require('paho-mqtt');
const mqttConfig = require('../config/mqttConfig');

var client = new MQTT.Client(
    mqttConfig.host,
    Number(mqttConfig.port),
    mqttConfig.path,
    mqttConfig.options.clientId
);

export const bindConnection = () => {
    var client = new MQTT.Client(
        mqttConfig.host,
        Number(mqttConfig.port),
        mqttConfig.path,
        mqttConfig.options.clientId
    );

    client.createConnection = (options) => {
        client.connect({
            userName: mqttConfig.options.username || 'swarm_user',
            password: mqttConfig.options.password || 'swarm_usere15',
            reconnect: true,
            useSSL: true,
            cleanSession: false,
            ...options
        });
    };

    client.publish = (topic, message, callback) => {
        var payload = new MQTT.Message(message);
        payload.destinationName = topic;
        client.send(payload);
        console.log('MQTT: published');
        if (callback != null) callback();
    };

    return client;
};

export default client;
