import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Home from './Home';
import Board from './Board';
import Score from './Score';

const Routes = () => (
    <Router history={history} >
        <Route exact path="/" component={Home} />
        <Route path="/board" component={Board} />
        <Route path="/score" component={Score} />
    </Router>
);

export default Routes;
