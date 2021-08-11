import './App.sass';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './routes/login/Login';
import Dashboard from './routes/dashboard/Dashboard';
import NotFound from './routes/NotFound/NotFound';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <HashRouter>
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
          <Route
            path='*'
            exact
            component={NotFound}
          />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
