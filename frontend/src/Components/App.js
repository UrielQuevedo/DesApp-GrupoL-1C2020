import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../View/Login';
import ComingSoon from '../View/ComingSoon';
import Register from '../View/Register';

function App() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path = '/' exact component={ComingSoon} />
          <Route path = '/register' exact component={Register} />
        </Switch>
      </Router>
);

}

export default App;
