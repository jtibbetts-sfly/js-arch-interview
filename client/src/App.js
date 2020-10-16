import React from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Shutterfly Sample App</h1>
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={ProductList} />
                    <Route path="/:productId" component={ProductDetails} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
