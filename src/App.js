import './App.sass';
import { HashRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Login from './routes/login/Login';
import Dashboard from './routes/dashboard/Dashboard';
import NotFound from './routes/NotFound/NotFound';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Settings from './routes/settings/Settings';
import Locations from './routes/locations/Locations';
import Toolbar from './shared/toolbar/Toolbar';
import MobileHeader from './shared/mobileHeader/MobileHeader';

function App() {
  return (
    <div className="App lightTheme">
      <HashRouter>
        <div className="row m-0">
          <Route
            path='/'
            render={props => (
              props.location.pathname !== '/' &&
              <>
                <div className="d-none d-md-block col-2 p-0">
                  <Toolbar/>
                </div>
                <div className='d-md-none'>
                  <MobileHeader/>
                </div>
              </>
            )}
          />
          <div className="col-10 mainContent">
              <Switch>
                <Route
                  path='/'
                  exact
                  component={Login}
                />
                <PrivateRoute
                  path='/dashboard'
                  exact
                >
                  <Dashboard/>
                </PrivateRoute>
                <PrivateRoute
                  path='/locations'
                  exact
                >
                  <Locations/>
                </PrivateRoute>
                <PrivateRoute
                  path='/settings'
                  exact
                >
                  <Settings/>
                </PrivateRoute>
                <Route
                  path='*'
                  exact
                  component={NotFound}
                />
              </Switch>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
