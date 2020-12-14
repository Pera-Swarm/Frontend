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
            id: '',
            xCoordinate: '',
            yCoordinate: '',
            heading: '',
            touched: {
                id: false,
                xCoordinate: false,
                yCoordinate: false,
                heading: sliderValue
            }
        };
        this.client = bindConnection();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
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

    update(event) {
        console.log('update');
        var message = JSON.stringify({
            id: this.state.id,
            x: this.state.xCoordinate,
            y: this.state.yCoordinate,
            heading: sliderValue
        });
        //alert(message);
        console.log(message);
        event.preventDefault();
        this.client.subscribe(TOPIC_INFO);
        this.client.publish(TOPIC_INFO, message);
    }

    create(event) {
        console.log('create');
        var message = JSON.stringify({
            id: this.state.id,
            x: this.state.xCoordinate,
            y: this.state.yCoordinate,
            heading: sliderValue
        });
        //alert(message);
        console.log(message);
        event.preventDefault();
        this.client.subscribe(TOPIC_CREATE);
        this.client.publish(TOPIC_CREATE, message);
    }

    delete(event) {
        console.log('delete');
        var message = JSON.stringify({ id: this.state.id });
        console.log(message);
        event.preventDefault();
        this.client.subscribe(TOPIC_DELETE);
        this.client.publish(TOPIC_DELETE, message);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    validate(id, xCoordinate, yCoordinate) {
        const errors = {
            id: '',
            xCoordinate: '',
            yCoordinate: ''
        };
        const regid = /^\d+$/;
        const regcordinates = /^-?\d*\.{0,1}\d+$/;
        if (this.state.touched.id && !regid.test(id))
            errors.id = 'Id should contain only numbers';
        if (this.state.touched.xCoordinate && !regcordinates.test(xCoordinate))
            errors.xCoordinate = 'x-Coordinate should contain only numbers';
        if (this.state.touched.yCoordinate && !regcordinates.test(yCoordinate))
            errors.yCoordinate = 'y-Coordinate should contain only numbers';

        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.id,
            this.state.xCoordinate,
            this.state.yCoordinate
        );
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
                                        value={this.state.id}
                                        valid={errors.id === ''}
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
                                <Label htmlFor="xCoordinate" md={3}>
                                    x-coordinate
                                </Label>
                                <Col md={3}>
                                    <Input
                                        type="number"
                                        id="xCoordinate"
                                        name="xCoordinate"
                                        placeholder="x-coordinate"
                                        value={this.state.xCoordinate}
                                        valid={errors.xCoordinate === ''}
                                        invalid={errors.xCoordinate !== ''}
                                        onBlur={this.handleBlur('xCoordinate')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.xCoordinate}</FormFeedback>
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
                                <Label htmlFor="yCoordinate" md={3}>
                                    y-coordinate
                                </Label>
                                <Col md={3}>
                                    <Input
                                        type="numberr"
                                        id="yCoordinate"
                                        name="yCoordinate"
                                        placeholder="y-coordinate"
                                        value={this.state.yCoordinate}
                                        valid={errors.yCoordinate === ''}
                                        invalid={errors.yCoordinate !== ''}
                                        onBlur={this.handleBlur('yCoordinate')}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.yCoordinate}</FormFeedback>
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
