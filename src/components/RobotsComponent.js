import React, { Component } from 'react';
import Select from 'react-select';
import { Tab, Row, Col, Nav } from 'react-bootstrap'; // Tabs
import { Button } from 'reactstrap';
import RobotControl from './robot/ControlComponent';
import MQTTBox from './robot/MQTTBoxComponent';

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' }
];

class Robots extends Component {
    state = {
        selectedOption: null
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <div className="container">
                <br></br>
                <div className="row row-header">
                    <div className="col-12">
                        <div className="container striped bordered hover">
                            <div className="row  d-flex align-items-center">
                                <div className="col-2 col-sm-2">Robots</div>
                                <div className="col-2 col-sm-4">
                                    <Select
                                        style={{ width: '30px' }}
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                    />
                                </div>
                                <div className="col-2">
                                    <Button variant="refresh">Refresh</Button>
                                </div>
                            </div>

                            <br></br>
                            <div className="row ">
                                <Tab.Container defaultActiveKey="control">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="control">
                                                        Control
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="localization">
                                                        Localization
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="sensors">
                                                        Sensors
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="logs">
                                                        Logs
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="mqttbox">
                                                        MQTT Box
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="control">
                                                    <h5>Control</h5>
                                                    <RobotControl />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="localization">
                                                    <h5>Localization</h5>
                                                    <p>
                                                        At vero eos et accusamus et iusto
                                                        odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum
                                                        deleniti atque corrupti quos
                                                        dolores et quas molestias
                                                        excepturi sint occaecati
                                                        cupiditate non provident,
                                                        similique sunt in culpa qui
                                                        officia deserunt mollitia animi,
                                                        id est laborum et dolorum fuga.
                                                    </p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="sensors">
                                                    <h5>Sensors</h5>
                                                    <p>
                                                        At vero eos et accusamus et iusto
                                                        odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum
                                                        deleniti atque corrupti quos
                                                        dolores et quas molestias
                                                        excepturi sint occaecati
                                                        cupiditate non provident,
                                                        similique sunt in culpa qui
                                                        officia deserunt mollitia animi,
                                                        id est laborum et dolorum fuga.
                                                    </p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="logs">
                                                    <h5>Logs</h5>
                                                    <p>
                                                        At vero eos et accusamus et iusto
                                                        odio dignissimos ducimus qui
                                                        blanditiis praesentium voluptatum
                                                        deleniti atque corrupti quos
                                                        dolores et quas molestias
                                                        excepturi sint occaecati
                                                        cupiditate non provident,
                                                        similique sunt in culpa qui
                                                        officia deserunt mollitia animi,
                                                        id est laborum et dolorum fuga.
                                                    </p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="mqttbox">
                                                    <h5>MQTT Box</h5>
                                                    <MQTTBox />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        );
    }
}

export default Robots;
