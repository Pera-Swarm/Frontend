import React, { PureComponent } from 'react';
import {
    Button,
    Col,
    Row
} from 'reactstrap';
import { TOPIC_INFO } from '../../config/topics';
import { bindConnection } from '../../services/mqtt';
import Publisher from './PublisherComponent';
import Subscriber from './SubscriberComponent';

class MQTTBox extends PureComponent {
    constructor(props) {
        super(props);
        this.pubcount = 1;
        this.subcount = 1;
        this.state = {
            publishers: [],
            subscribers: []
        }
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
        this.client.disconnect();
    }

    deletepub = (index) => {
        const copyPublishers = Object.assign([], this.state.publishers);
        copyPublishers.splice(index, 1);
        this.setState({
            publishers: copyPublishers
        })
    }

    addpub = () => {
        this.pubcount = this.pubcount + 1;
        const copyPublishers = Object.assign([], this.state.publishers)
        copyPublishers.push({
            id: this.pubcount
        })
        this.setState({
            publishers: copyPublishers
        })
    }

    deletesub = (index) => {
        const copySubscribers = Object.assign([], this.state.subscribers);
        copySubscribers.splice(index, 1);
        this.setState({
            subscribers: copySubscribers
        })
    }

    addsub = () => {
        this.subcount = this.subcount + 1;
        const copySubscribers = Object.assign([], this.state.subscribers)
        copySubscribers.push({
            id: this.subcount
        })
        this.setState({
            subscribers: copySubscribers
        })
    }

    render() {
        return (
            <div>
                <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                    et quas molestias excepturi sint occaecati cupiditate non provident,
                    similique sunt in culpa qui officia deserunt mollitia animi, id est
                    laborum et dolorum fuga.
                </p>

                <Button type="button" color="success" align="right" id="addpub" onClick={this.addpub}>Add publisher</Button>
                <Button type="button" color="warning" align="right" id="addsub" onClick={this.addsub}>Add subscriber</Button>
                <Row>
                    <Col md={6}>
                        {
                            this.state.publishers.map((pub, index) => {
                                return (
                                    <Publisher
                                        key={pub.id}
                                        id={pub.id}
                                        deletepub={this.deletepub.bind(this, index)}
                                    />
                                )
                            })
                        }

                    </Col>

                    <Col md={6}>
                        {
                            this.state.subscribers.map((sub, index) => {
                                return (
                                    <Subscriber
                                        key={sub.id}
                                        id={sub.id}
                                        deletesub={this.deletesub.bind(this, index)}
                                    />
                                )
                            })
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}

export default MQTTBox;


