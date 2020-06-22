import React from 'react';
import Home from './Pages/Home/Home'
import Room from './Pages/Room/Room'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/room" component={Room} />
      </Router>
    </div>
  );
}

export default App;
