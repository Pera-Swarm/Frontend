import React, { PureComponent } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Input,
    Form,
    FormGroup,
    Label,
    Col,
    Row
} from 'reactstrap';
import { TOPIC_INFO } from '../../config/topics';
import { bindConnection } from '../../services/mqtt';

class MQTTBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pub_topic: '',
            pub_messagebox: '',
            sub_topic: '',
            sub_messagebox: ''
        };
        this.client = bindConnection();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.publisher = this.publisher.bind(this);
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

    publisher(event) {
        console.log('publish');
        event.preventDefault();
        this.client.publish(this.state.pub_topic, this.state.pub_messagebox);
        if (this.state.sub_topic === this.state.pub_topic) {
            document.getElementById("sub_messagebox").innerHTML = this.state.pub_messagebox;
        }
    }

    subscriber(event) {
        console.log('subscribe');
        event.preventDefault();
        this.client.subscribe(this.state.sub_topic);

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

                <Row>
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Publisher</CardTitle>
                                <Form onSubmit={this.publisher}>
                                    <FormGroup row>
                                        <Label htmlFor="pub_topic" md={3}>
                                            Topic
                                    </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Input type="textarea" id="pub_topic" name="pub_topic" rows="2" value={this.state.pub_topic} onChange={this.handleInputChange}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="pub_messagebox" md={3}>
                                            Message
                                    </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Input type="textarea" id="pub_messagebox" name="pub_messagebox" rows="2" value={this.state.pub_messagebox} onChange={this.handleInputChange}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Button
                                            type="button"
                                            onClick={this.publisher}
                                            color="primary"
                                            align="right"
                                        >
                                            Publish
                                    </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Subscriber</CardTitle>
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
                                            color="primary"
                                            align="right"
                                        >
                                            Subscribe
                                    </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MQTTBox;
