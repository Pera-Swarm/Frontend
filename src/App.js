import React,{ Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { HashRouter } from 'react-router-dom';

class App extends Component{
    render(){
        return (
            <HashRouter basename=''>
                <div>
                    <Main />
                </div>
            </HashRouter>
        );
    }
}

export default App;
