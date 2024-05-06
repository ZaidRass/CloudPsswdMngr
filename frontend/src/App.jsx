import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './views/home';
import login from './views/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/login" component={login} />
        
      </Switch>
    </Router>
  );
}

export default App;
