import './App.sass';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './routes/login/Login';
import Dashboard from './routes/dashboard/Dashboard';
import NotFound from './routes/NotFound/NotFound';

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
          <Route
            path='/dashboard'
            exact
            component={Dashboard}
          />
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
