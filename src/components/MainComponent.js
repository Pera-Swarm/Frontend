import React, { Component } from 'react';
import Home from './HomeComponent';
import Visualizer from './VisualizerComponent';
import Robots from './RobotsComponent';
import Manager from './ManagerComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Settings from './SettingsComponent';
import Navigation from './NavComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Navigation />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/manager" component={Manager} />
                    <Route path="/visualizer" component={Visualizer} />
                    <Route exact path="/robots" component={Robots} />
                    <Route exact path="/settings" component={Settings} />
                    <Redirect to="/home" />
                </Switch>
                <br></br>

                <Footer />
            </div>
        );
    }
}
export default Main;
