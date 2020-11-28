//const dotenv = require('dotenv');

module.exports =  {

    host: process.env.MQTT_HOST || 'localhost',
    port: process.env.MQTT_PORT || 8883,
    path: process.env.MQTT_PATH || '/',
    options: {
        port: 8883,
        clientId: 'admin_' + Math.random().toString(16).substr(2, 8),
        username: process.env.MQTT_USER || '',
        password: process.env.MQTT_PASS || ''
    },
    mqttOptions: {
        qos: 2,
        rap: false,
        rh: true
    }
};
