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
import Products from '../View/Products';
import Register from '../View/Register';
import Store from '../View/Store';
import AllStoresWrapper from '../Wrapper/AllStoresWrapper';
import StoresCategoriesWrapper from '../Wrapper/StoresByCategoriesWrapper';
import NavigationBar from './NavigationBar/NavigationBar';
import ScrollToTop from './ScrollToTop';
import PublishStore from '../View/PublishStore';
import UserData from '../View/UserData';
import UserOrders from '../View/UserOrders';
import ShoppingCartProvider from '../Context/ShoppingCartContext';
import MakeAPurchase from '../View/MakeAPurchase';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route path='/register' exact component={Register} />
          <Route path="/login" exact component={Login} />
          <UserProvider>
            <Switch>
              <Route exact path="/mylocation" component={Location} />
            </Switch>
            <NavigationBar />
            <ScrollToTop>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/store' component={Store} />
                <Route exact path='/profile/mydata' component={UserData} />
                <Route exact path='/profile/myorders' component={UserOrders} />
                <Route exact path='/publish/store' component={PublishStore} />
                <ShoppingCartProvider>
                  <Route exact path='/profile/shoppingcart' component={MakeAPurchase}/>
                  <Route exact path='/stores' component={AllStoresWrapper} />
                  <Route exact path='/stores/category/:category' component={StoresCategoriesWrapper} />
                  <Route exact path='/stores/:store_id/products/:category' component={Products} />
                </ShoppingCartProvider>
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
