import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../View/Login';
import ComingSoon from '../View/ComingSoon';
import Register from '../View/Register';
import Location from '../View/Location';
import Store from '../View/Store'; 

function App() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/login/location" exact component={Location} />
          <Route path = '/' exact component={ComingSoon} />
          <Route path = '/register' exact component={Register} />
          <Route path = '/store' exact component={Store} />
        </Switch>
      </Router>
);

}

export default App;
