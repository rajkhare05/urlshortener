import React from 'react';
import Header from './components/Home/Header';
import Main from './components/Home/Main'
// import LinkBoard from './components/LinkBoard'
import About from './components/About'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Main} />
        {/* <Route path='/links' component={LinkBoard} /> */}
        <Route path='/about' component={About} />
      </Switch>
    </Router>
  );
}

export default App;
