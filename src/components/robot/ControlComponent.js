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
    Row,
    FormFeedback
} from 'reactstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { TOPIC_INFO, TOPIC_CREATE, TOPIC_DELETE } from '../../config/topics';
import { bindConnection } from '../../services/mqtt';

var sliderValue = 30;

const VolumeSlider = () => {
    const [value, setValue] = React.useState(sliderValue);
    return (
        <RangeSlider
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                sliderValue = e.target.value;
            }}
            min={-180}
            max={180}
            size={'lg'}
            step={0.5}
        />
    );
};

class RobotControl extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            touched: {
                id: false,
                x: false,
                y: false,
                heading: false
            },
            data: {
                id: undefined,
                x: undefined,
                y: undefined,
                heading: undefined
            },
            isConnected: false
        };
        this.client = bindConnection();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        console.log('ccc', this.state.isConnected);
        this.client.createConnection({
            onSuccess: () => {
                console.log('MQTT:connected');
                this.setState({
                    isConnected: true
                });
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
        if(!this.client.isConnected()){
            this.client.disconnect();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [name]: value
            }
        });
    }

    create(event) {
        event.preventDefault();
        if (this.client.isConnected()) {
            console.log('create', this.state.isConnected);
            this.client.subscribe(TOPIC_CREATE);
            var message = JSON.stringify({ ...this.state.data, heading: sliderValue });
            console.log(message);
            //alert(message);
            this.client.publish(TOPIC_CREATE, message);
        }
    }

    delete(event) {
        event.preventDefault();
        if (this.client.isConnected()) {
            console.log('delete');
            this.client.subscribe(TOPIC_DELETE);
            var message = JSON.stringify({ ...this.state.data, heading: sliderValue });
            //alert(message);
            console.log(message);
            this.client.publish(TOPIC_DELETE, message);
        }
    }

    update(event) {
        event.preventDefault();
        if (this.client.isConnected()) {
            console.log('update');
            this.client.subscribe(TOPIC_INFO);
            var message = JSON.stringify({ ...this.state.data, heading: sliderValue });
            //alert(message);
            console.log(message);
            this.client.publish(TOPIC_INFO, message);
        }
    }

    handleBlur = (field) => (evt) => {
        const { touched } = this.state;
        this.setState({
            touched: { ...touched, [field]: true }
        });
    };

    validate(id, x, y, heading) {
        const errors = {
            id: '',
            x: '',
            y: '',
            heading: ''
        };
        const regid = /^\d+$/;
        const regcordinates = /^-?\d*\.{0,1}\d+$/;
        if (this.state.touched.id && !regid.test(id))
            errors.id = 'Id should contain only numbers';
        if (this.state.touched.x && !regid.test(x))
            errors.x = 'x-Coordinate should contain only numbers';
        if (this.state.touched.y && !regid.test(y))
            errors.y = 'y-Coordinate should contain only numbers';
        return errors;
    }

    render() {
        const { data, touched } = this.state;
        const { id, heading, x, y } = data;
        const errors = this.validate(id, x, y, heading);
        return (
            <div>
                <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui
                    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                    et quas molestias excepturi sint occaecati cupiditate non provident,
                    similique sunt in culpa qui officia deserunt mollitia animi, id est
                    laborum et dolorum fuga.
                </p>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Control Robots</CardTitle>
                        <Form onSubmit={this.create}>
                            <FormGroup row>
                                <Label htmlFor="id" md={3}>
                                    Id
                                </Label>
                                <Col md={3}>
                                    <Input
                                        type="number"
                                        id="id"
                                        name="id"
                                        placeholder="Id"
                                        value={id}
                                        valid={errors.id === '' && touched.id}
                                        invalid={errors.id !== ''}
                                        onBlur={this.handleBlur('id')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.id}</FormFeedback>
                                </Col>
                                <Col md={{ size: 3, offset: 3 }}>
                                    <Button type="submit" color="primary">
                                        Create
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="x" md={3}>
                                    x-coordinate
                                </Label>
                                <Col md={3}>
                                    <Input
                                        type="number"
                                        id="x"
                                        name="x"
                                        placeholder="x-coordinate"
                                        value={x}
                                        valid={errors.x === '' && touched.x}
                                        invalid={errors.x !== ''}
                                        onBlur={this.handleBlur('x')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.x}</FormFeedback>
                                </Col>
                                <Col md={{ size: 3, offset: 3 }}>
                                    <Button
                                        type="button"
                                        onClick={this.delete}
                                        color="primary"
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="y" md={3}>
                                    y-coordinate
                                </Label>
                                <Col md={3}>
                                    <Input
                                        type="number"
                                        id="y"
                                        name="y"
                                        placeholder="y-coordinate"
                                        value={y}
                                        valid={errors.y === '' && touched.y}
                                        invalid={errors.y !== ''}
                                        onBlur={this.handleBlur('y')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.y}</FormFeedback>
                                </Col>
                                <Col md={{ size: 3, offset: 3 }}>
                                    <Button
                                        type="button"
                                        onClick={this.update}
                                        color="primary"
                                    >
                                        Update
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="heading" md={3}>
                                    Heading
                                </Label>
                                <Col md={3}>
                                    <VolumeSlider />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <br></br>
            </div>
        );
    }
}

export default RobotControl;
