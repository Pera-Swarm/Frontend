const dotenv = require('dotenv');

export default {

    host: process.env.REACT_APP_MQTT_HOST || 'localhost',
    port: process.env.REACT_APP_MQTT_PORT || 8883,
    path: process.env.REACT_APP_MQTT_PATH || '/',
    options: {
        port: 8883,
        clientId: 'admin_' + Math.random().toString(16).substr(2, 8),
        username: process.env.REACT_APP_MQTT_USER || '',
        password: process.env.REACT_APP_MQTT_PASS || ''
    },
    mqttOptions: {
        qos: 2,
        rap: false,
        rh: true
    }
};
