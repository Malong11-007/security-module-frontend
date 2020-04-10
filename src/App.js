import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApplicationSearch from './components/Application/ApplicationSearch'
import RolesSearch from './components/Roles/RolesSearch'
import RolesFormsSearch from './components/Roles_Forms/RolesFormsSearch'
import RolesModulesSearch from './components/Roles_Modules/RolesModulesSearch'
import UserRolesSearch from './components/User_Roles/UserRolesSearch'
import UsersSearch from './components/Users/UsersSearch'
import SamplePage from './components/SamplePage';
import POForm from './components/PurchaseOrders/POForm';
import POSearch from './components/PurchaseOrders/POSearch';
import Login from './components/Login';
import './App.css';
import 'react-table-6/react-table.css';
import API from './baseURL.js';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import { user_logout } from './actions/userActions.js';
import { clear_lines, remove_header } from './actions/PO_Actions.js';

function App() {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector(state => state.user);

	const logout = () => {
		API.post('/login/logout')
		.then(response => {
			if(response.status === 200){
				console.log(response);
				dispatch(user_logout())
				dispatch(clear_lines())
				dispatch(remove_header())
				window.location.href = '/login';
			}
		})
	}

  return (
    <div className="App">
    {isLoggedIn && <button onClick={() => logout()}>Logout(for demo)</button>}
      <Router>
        <Switch>
        	<Route path="/login" component={Login} />
        	<ProtectedRoute authed={isLoggedIn} path="/dashboard" component={SamplePage} />
        	<Redirect exact to="login" from="/"/>
          <Route exact path="/purchaseOrder/:edit/:headerID" component={POForm} />
          <Route exact path="/purchaseOrder" component={POSearch} />
          <Route exact path="/application" component={ApplicationSearch} />
          <Route exact path="/roles" component={RolesSearch} />
          <Route exact path="/roles-forms" component={RolesFormsSearch} />
          <Route exact path="/roles-modules" component={RolesModulesSearch} />
          <Route exact path="/user-roles" component={UserRolesSearch} />
          <Route exact path="/users" component={UsersSearch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
