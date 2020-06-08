import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthProvider from '../Context/AuthContext';
import UserProvider from '../Context/UserContext';
import '../Styles/App.css';
import '../Utils/i18next';
import Home from '../View/Home';
import Location from '../View/Location';
import Login from '../View/Login';
import MessagePage from '../View/MessagePage';
import Register from '../View/Register';
import Store from '../View/Store';
import NavigationBar from './NavigationBar/NavigationBar';
import ScrollToTop from './ScrollToTop';
import StoresCategoriesView from './StoresView/StoresCategoriesView';
import AllStoresView from './StoresView/AllStoresView';
import ProductWrapper from './ProductsWrapper';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route path='/register' exact component={Register} />
          <Route path="/login" exact component={Login} />
          <UserProvider>
            <Route exact path="/mylocation" component={Location} />
            <NavigationBar />
            <ScrollToTop>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/store' component={Store} />
                <Route exact path='/stores' component={AllStoresView} />
                <Route exact path='/stores/category/:category' component={StoresCategoriesView} />
                <Route exact path='/stores/:store_id/products/:category' component={ProductWrapper} />
                <Route exact path='/stores/:store_id/products' component={ProductWrapper} />
                <Route exact path='/profile' render={() => <MessagePage title="Coming Soon" />} />
                <Route path='*' render={() => <MessagePage errorNumnber="404" title="Not Found" />} />
              </Switch>
            </ScrollToTop>
          </UserProvider>
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
