import React  from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ComingSoon from '../View/ComingSoon';
import Store from '../View/Store';
import '../Styles/App.css';
import '../Utils/i18next';
import AuthProvider from '../Context/AuthContext';
import Login from '../View/Login';
import UserProvider from '../Context/UserContext';
import Home from '../View/Home';
import Register from '../View/Register';
import Location from '../View/Location';

function App() {
    return (
      <Router>
          <Switch>
            <AuthProvider>
                <Route path='/register' exact component={Register} />
                <Route path="/login" exact component={Login} />
              <UserProvider>
                <Route path='/' exact component={Home} />
                <Route path="/mylocation" exact component={Location} />
                <Route path='/store' exact component={Store} />
              </UserProvider>
            </AuthProvider>
          </Switch>
      </Router>
);

}

export default App;
