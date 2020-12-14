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

const AddPublisher  = () => {
    return <Publisher />
}

const Addsubscriber  = () => {
    return <Subscriber />
}

class MQTTBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            publishers: [],
            subscribers:[]
        }

        this.addpub = () => {
            this.setState({
                publishers: [...this.state.publishers, <AddPublisher />]
            })
        }

        this.addsub = () => {
            this.setState({
                subscribers: [...this.state.subscribers, <Addsubscriber />]
            })
        }

        this.client = bindConnection();
        this.addpublisher = this.addpublisher.bind(this);
        this.addubscriber = this.addsubscriber.bind(this);
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

    addpublisher(event) {
        console.log('pub');
    }

    addsubscriber(event) {
        console.log('sub');
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
                        <Publisher />
                        {this.state.publishers}
                    </Col>

                    <Col md={6}>
                        <Subscriber />
                        {this.state.subscribers}
                    </Col>
                </Row>

            </div>
        );
    }
}

export default MQTTBox;


