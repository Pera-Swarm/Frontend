import React, { PureComponent } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Input,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import { TOPIC_INFO } from '../../config/topics';
import { bindConnection } from '../../services/mqtt';

class MQTTBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sub_topic: '',
            sub_messagebox: ''
        };
        this.client = bindConnection();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.subscriber = this.subscriber.bind(this);
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    subscriber(event) {
        console.log('subscribe');
        event.preventDefault();
        this.client.subscribe(this.state.sub_topic);

    }

    render() {
        return (
            <div>
                <Card style={{ borderColor: '#E0A800' }}>
                    <CardBody>
                        <CardTitle tag="h5">Subscriber
                        <Button close />
                        </CardTitle>
                        <Form onSubmit={this.subscriber}>
                            <FormGroup row>
                                <Label htmlFor="sub_topic" md={3}>
                                    Topic
                                    </Label>
                            </FormGroup>
                            <FormGroup row>
                                <Input type="textarea" id="sub_topic" name="sub_topic" rows="2" value={this.state.sub_topic} onChange={this.handleInputChange}>
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="sub_messagebox" md={3}>
                                    Message
                                    </Label>
                            </FormGroup>
                            <FormGroup row>
                                <Input type="textarea" id="sub_messagebox" name="sub_messagebox" rows="2" value={this.state.sub_messagebox} onChange={this.handleInputChange}>
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Button
                                    type="button"
                                    onClick={this.subscriber}
                                    color="warning"
                                    align="right"
                                >
                                    Subscribe
                                    </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <br></br>
            </div>
        );
    }
}

export default MQTTBox;
