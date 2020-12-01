import React, { Component, useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
// This should have mqtt support from  paho-mqtt library

import RangeSlider from 'react-bootstrap-range-slider';
import Test from '../Test';

const VolumeSlider = () => {
    const [value, setValue] = React.useState(30);
    return (
        <RangeSlider style={"width:100%"}
            value={value}
            onChange={e => setValue(e.target.value)}
            min={-180}
            max={180}
            size={'lg'}
            step={0.5}
        />
    );
};

class RobotControl extends Component {
    create() {
        console.log('create');

    }

    delete() {
        console.log('delete');

    }

    render() {
        return (
            <div>
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

                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Control Robots</CardTitle>
                        <div className="row">
                            <div className="col-6">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText >Id </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="id" />
                                </InputGroup>
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                            <div className="col-3">
                                <Button onClick={this.create}>Create</Button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>x-coordinates</InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="x-coordinates" />
                                </InputGroup>
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                            <div className="col-3">
                                <Button onClick={this.delete}>Delete</Button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>y-coordinates</InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="y-coordinates" />
                                </InputGroup>
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Heading</InputGroupText>
                                    </InputGroupAddon>
                                    <VolumeSlider />
                                </InputGroup>
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                            <div className="col-3">
                                &nbsp;
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
export default RobotControl;
