import React from 'react';
import '../Styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        < Router >
        < Switch >
        < Route
    path = '/'
    exact >
    < div
    className = "App" >
        < span > Coming
    Soon < /span>
    < /div>
    < /Route>
    < /Switch>
    < /Router>
)
    ;
}

export default App;
