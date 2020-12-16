import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import { bindConnection } from '../../services/mqtt';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

// {
//     id: 1,
//     client: {}
// }

class MBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishers: [],
            pubCount: 0,
            subscribers: [],
            subCount: 0
        };
    }

    addPublisher = () => {
        const pub = {
            id: this.state.pubCount,
            client: bindConnection()
        };
        const pubs = this.state.publishers;
        const pubCount = this.state.pubCount;
        pubs.push(pub);
        this.setState(
            {
                publishers: pubs,
                pubCount: pubCount + 1
            },
            () => {
                console.log(this.state);
            }
        );
    };

    addSubscriber = () => {
        const sub = {
            id: this.state.subCount,
            client: bindConnection()
        };
        const subs = this.state.subscribers;
        const subCount = this.state.subCount;
        subs.push(sub);
        this.setState(
            {
                subscribers: subs,
                subCount: subCount + 1
            },
            () => {
                console.log(this.state);
            }
        );
    };

    render() {
        return (
            <div>
                <p>
                    A Sandbox for testing MQTT messages and responses that are unique to
                    "pera-swarm". You can add many publishers/subscribers as you want.
                </p>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Publishers</CardTitle>
                                <CardText>
                                    Add Publishers by clicking the button below.
                                </CardText>
                                <Button color="success" onClick={this.addPublisher}>
                                    Add Publisher
                                </Button>
                                {this.state.publishers.map((pub, index) => {
                                    return <Publisher key={index} />;
                                })}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Subscribers</CardTitle>
                                <CardText>
                                    Add Subscribers by clickng the button below for a
                                    given topic.
                                </CardText>
                                <Button color="warning" onClick={this.addSubscriber}>
                                    Add Subscriber
                                </Button>
                                {this.state.subscribers.map((sub, index) => {
                                    return (
                                        <Subscriber
                                            key={index}
                                            id={sub.id}
                                            client={sub.client}
                                        />
                                    );
                                })}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* <CardDeck>
                </CardDeck> */}
            </div>
        );
    }
}

export default MBox;
