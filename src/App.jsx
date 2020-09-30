import React from 'react';
import { Route } from 'react-router';
import Home from './components/Home.js';


const App = (props) => {
    return (
        <Route exact path='/' component={Home} />
    );
}

export default App;