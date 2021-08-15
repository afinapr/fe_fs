import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const UserManagement = React.lazy (() => import('./views/pages/usermanagement/UserManagement'));
const FormCreate = React.lazy (() => import('./views/pages/formcreate/FormCreate'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/usermanagement" name="User Management" render={props => <UserManagement {...props}/>} />
              <Route exact path="/formcreate" name="Form Create User" render={props => <FormCreate {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

//
