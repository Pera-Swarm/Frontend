import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Input,
    Form,
    FormGroup,
    Label,
    FormFeedback,
    ListGroupItem,
    ListGroup
} from 'reactstrap';

const MQTTBox = (props) => {
    const { id, client: mqttClient } = props;
    const [topic, setTopic] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [client, setClient] = useState(mqttClient);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('mounted & prop changed', client, id, props);
        if (client === undefined) {
            const { client: mqttClient } = props;
            setClient(mqttClient);
        }
        return () => {
            console.log('cleanup');
        };
    }, [client, props, id]);

    const handleSubsciption = (event) => {
        console.log('subscribe');
        event.preventDefault();
        if (topic !== '') {
            if (!client.isConnected()) {
                client.createConnection(
                    {
                        onSuccess: () => {
                            console.log('MQTT:connected from subscriber:', id);
                            // subscription
                            client.subscribe(topic);
                            setSubscribed(true);
                            client.onMessageArrived = onMessageArrived;
                            client.onConnectionLost = onConnectionLost;
                        },
                        onFailure: () => {
                            console.log('MQTT: connection failed');
                        }
                    },
                    (err) => {
                        if (!err) {
                            client.subscribe(topic);
                        }
                    }
                );
            }
        }
    };

    const onMessageArrived = (e) => {
        console.log(e);
        const newMessage = JSON.parse(e.payloadString);
        const prevMessages = messages;
        prevMessages.push(newMessage);
        setMessages(prevMessages);
        console.log(messages);
    };

    const onConnectionLost = (e) => {
        console.log(e);
        setTopic('');
        setSubscribed(false);
        setClient(undefined);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setTopic(value);
    };

    return (
        <div className="my-3">
            <Card style={{ borderColor: '#E0A800' }}>
                <CardBody
                    style={{ paddingBottom: '0px', paddingTop: '0px', margin: '0px' }}
                >
                    <CardTitle tag="h5" style={{ paddingTop: '5px', margin: '0px' }}>
                        Subscriber
                        <Button close onClick={props.deletesub} />
                    </CardTitle>
                    <Form onSubmit={handleSubsciption}>
                        <FormGroup row className="mt-3">
                            <div className="col-2">
                                <Label htmlFor="topic">Topic</Label>
                            </div>
                            {/* <div className="col-1"></div> */}
                            <div className="col">
                                <Input
                                    type="textarea"
                                    id="topic"
                                    name="topic"
                                    rows="1"
                                    width={'100%'}
                                    value={topic}
                                    valid={topic !== ''}
                                    invalid={topic === ''}
                                    onChange={handleInputChange}
                                    disabled={subscribed}
                                ></Input>
                                <FormFeedback>
                                    {topic === '' || typeof topic === 'string'
                                        ? 'Topic should contain a valid string'
                                        : null}
                                </FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className="col-3">
                                {!subscribed && (
                                    <Button
                                        type="button"
                                        onClick={handleSubsciption}
                                        color="warning"
                                        align="right"
                                    >
                                        Subscribe
                                    </Button>
                                )}
                            </div>
                        </FormGroup>
                    </Form>
                    {messages.length !== 0 ? <h5>Messages</h5> : null}
                    <ListGroup className="mb-3">
                        {subscribed &&
                            messages.map((message, index) => {
                                console.log(message);
                                return (
                                    <ListGroupItem
                                        // active
                                        tag="button"
                                        action
                                        key={index}
                                    >
                                        Cras justo odio
                                    </ListGroupItem>
                                );
                            })}
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    );
    // }
};

export default MQTTBox;
