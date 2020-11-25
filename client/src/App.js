import React from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import AuthDetails from './AuthDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthContext, useAuthReducer } from './AuthService';

function App() {
    const context = useAuthReducer();
    return (
        <AuthContext.Provider value={context}>
            <div className="App">
                <h1>Shutterfly Sample App</h1>
                <AuthDetails />
                <Router>
                    <Switch>
                        <Route path="/" exact={true} component={ProductList} />
                        <Route path="/:productId" component={ProductDetails} />
                    </Switch>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
