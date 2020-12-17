import React, { PureComponent } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { TOPIC_INFO } from '../../config/topics';
import { bindConnection } from '../../services/mqtt';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

class MQTTBox extends PureComponent {
    constructor(props) {
        super(props);
        this.pubcount = 1;
        this.subcount = 1;
        this.state = {
            publishers: [],
            subscribers: []
        };
        this.client = bindConnection();
    }

    componentDidMount() {
        this.client.createConnection({
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

    componentWillUnmount() {
        if (!this.client.isConnected()) {
            this.client.disconnect();
        }
    }

    deletepub = (index) => {
        const prevPublishers = Object.assign([], this.state.publishers);
        prevPublishers.splice(index, 1);
        this.setState({
            publishers: prevPublishers
        });
    };

    addpub = () => {
        this.pubcount = this.pubcount + 1;
        const prevPublishers = Object.assign([], this.state.publishers);
        prevPublishers.push({
            id: this.pubcount
        });
        this.setState({
            publishers: prevPublishers
        });
    };

    deletesub = (index) => {
        const prevSubscribers = Object.assign([], this.state.subscribers);
        prevSubscribers.splice(index, 1);
        this.setState({
            subscribers: prevSubscribers
        });
    };

    addsub = () => {
        this.subcount = this.subcount + 1;
        const prevSubscribers = Object.assign([], this.state.subscribers);
        prevSubscribers.push({
            id: this.subcount
        });
        this.setState({
            subscribers: prevSubscribers
        });
    };

    render() {
        return (
            <div>
                <p>
                    A Sandbox for testing MQTT messages and responses that are unique to
                    "pera-swarm".
                </p>

                <Button
                    type="button"
                    color="success"
                    align="right"
                    id="addpub"
                    onClick={this.addpub}
                >
                    Add publisher
                </Button>
                <Button
                    type="button"
                    color="warning"
                    align="right"
                    id="addsub"
                    onClick={this.addsub}
                >
                    Add subscriber
                </Button>
                <Row>
                    <Col md={6}>
                        {this.state.publishers.map((pub, index) => {
                            return (
                                <Publisher
                                    key={pub.id}
                                    id={pub.id}
                                    deletepub={this.deletepub.bind(this, index)}
                                />
                            );
                        })}
                    </Col>

                    <Col md={6}>
                        {this.state.subscribers.map((sub, index) => {
                            return (
                                <Subscriber
                                    key={sub.id}
                                    id={sub.id}
                                    deletesub={this.deletesub.bind(this, index)}
                                />
                            );
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MQTTBox;
