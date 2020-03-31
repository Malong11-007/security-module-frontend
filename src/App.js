import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplicationSearch from './components/Application/ApplicationSearch'
import RolesSearch from './components/Roles/RolesSearch'
import RolesFormsSearch from './components/Roles_Forms/RolesFormsSearch'
import RolesModulesSearch from './components/Roles_Modules/RolesModulesSearch'
import UserRolesSearch from './components/User_Roles/UserRolesSearch'
import UsersSearch from './components/Users/UsersSearch'
import Pagination from './components/Pagination';
import PurchaseOrder from './components/PurchaseOrder/PurchaseOrder.js';
import PurchaseOrders from './components/PurchaseOrders/PurchaseOrderInline.js';
import PurchaseOrderHeader from './components/PurchaseOrders/PurchaseOrderHeader.js';

import UserSignIn from "./components/SignIn/UserSignIn.js";
import './App.css';
import 'react-table-6/react-table.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/UserSignIn" component={UserSignIn}/>
          <Route path="/pagination" component={Pagination}/>
          <Route exact path="/application" component={ApplicationSearch} />
          <Route exact path="/roles" component={RolesSearch} />
          <Route exact path="/roles-forms" component={RolesFormsSearch} />
          <Route exact path="/roles-modules" component={RolesModulesSearch} />
          <Route exact path="/user-roles" component={UserRolesSearch} />
          <Route exact path="/users" component={UsersSearch} />
          <Route path="/purchase" component={PurchaseOrder} />
          <Route path="/purchaseInline" component={PurchaseOrders} />
          <Route path="/purchaseHeader" component={PurchaseOrderHeader} / >
          {/* <Route 
            path="/application/insert" 
            render={(props) => <ApplicationForm {...props} type="insert" />}
          /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
