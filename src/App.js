import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SamplePage from './components/SamplePage.js'
import Pagination from './components/Pagination';
import './App.css';
import 'react-table-6/react-table.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        	<Route path="/pagination" component={Pagination}/>
          <Route exact path="/application" component={SamplePage} />
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
