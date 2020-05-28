import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../View/Login';
import ComingSoon from '../View/ComingSoon';
import Register from '../View/Register';
import Location from '../View/Location';
import Store from '../View/Store';
import Home from '../View/Home';
import '../Styles/App.css';
import AuthProvider from '../Context/AuthContext';

function App() {
    return (
      <Router>
        <Switch>
          <AuthProvider>
            <Route path="/login" exact component={Login} />
            <Route path="/login/location" exact component={Location} />
            <Route path = '/' exact component={Home} />
            <Route path = '/register' exact component={Register} />
            <Route path = '/store' exact component={Store} />
          </AuthProvider>
        </Switch>
      </Router>
);

}

export default App;
