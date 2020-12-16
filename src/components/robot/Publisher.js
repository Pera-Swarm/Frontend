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

class Publisher extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pub_topic: '',
            pub_messagebox: ''
        };
        this.client = bindConnection();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.publisher = this.publisher.bind(this);
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
            document.getElementById(
                'sub_messagebox'
            ).innerHTML = this.state.pub_messagebox;
        }
    }

    render() {
        return (
            <div className="my-3">
                <Card style={{ borderColor: '#218838' }}>
                    <CardBody
                        style={{ paddingBottom: '0px', paddingTop: '0px', margin: '0px' }}
                    >
                        <CardTitle tag="h5" style={{ paddingTop: '5px', margin: '0px' }}>
                            Publisher
                            <Button close onClick={this.props.deletepub} />
                        </CardTitle>
                        <Form onSubmit={this.publisher}>
                            <FormGroup row>
                                <div className="col-2">
                                    <Label htmlFor="pub_topic">Topic</Label>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-9">
                                    <Input
                                        type="textarea"
                                        id="pub_topic"
                                        name="pub_topic"
                                        rows="1"
                                        value={this.state.pub_topic}
                                        onChange={this.handleInputChange}
                                    ></Input>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-2">
                                    <Label htmlFor="pub_messagebox">Message</Label>
                                </div>
                                <div className="col-1">&nbsp;</div>
                                <div className="col-9">
                                    <Input
                                        type="textarea"
                                        id="pub_messagebox"
                                        name="pub_messagebox"
                                        rows="1"
                                        value={this.state.pub_messagebox}
                                        onChange={this.handleInputChange}
                                    ></Input>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-3">
                                    <Button
                                        type="button"
                                        onClick={this.publisher}
                                        color="success"
                                        align="right"
                                    >
                                        Publish
                                    </Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Publisher;
