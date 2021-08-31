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
import Store from './context/Store';
import Users from './routes/users/Users';
import LocationEdit from './routes/locations/locationEdit/LocationEdit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { HELPERS, TOAST_TYPES } from './util/helpers';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

function App() {

  useEffect(() => {
    HELPERS.addToastListener((type, message) => {
      const actionMap = {
        [TOAST_TYPES.INFO]: showInfoToast,
        [TOAST_TYPES.SUCCESS]: showSuccessToast,
        [TOAST_TYPES.WARNING]: showWarningToast,
        [TOAST_TYPES.ERROR]: showErrorToast
      };
      actionMap[type](message);
    });
  }, []);

  const showInfoToast = (message) => toast.info(message);
  const showSuccessToast = (message) => toast.success(message);
  const showWarningToast = (message) => toast.warning(message);
  const showErrorToast = (error) => {
    error && toast.error(`${error.status} ${error.statusText}: ${error.data}`);
  }
  
  return (
    <Store>
      <div className="App lightTheme">
        <HashRouter>
          <div className="row m-0">
            <Route
              path='/'
              render={props => (
                props.location.pathname !== '/login' &&
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
            <div id='mainContent' className="col mainContent">
                <ScrollToTop/>
                <Switch>
                  <Route
                    path='/'
                    exact
                    render={props => <Redirect to='/dashboard'/>}
                  />
                  <Route
                    path='/login'
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
                    path='/location/:slug'
                    
                  >
                    <LocationEdit/>
                  </PrivateRoute>
                  <PrivateRoute
                    path='/users'
                    exact
                  >
                    <Users/>
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
      <ToastContainer/>
    </Store>
  );
}

export default App;
