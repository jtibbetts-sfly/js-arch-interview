import React from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthenticateButton from './UserAuthentication';
import UserData from './UserData';

function App() {
    const [userName, setUserName] = useState(null);
    const [isJwtTokenValid, setIsJwtTokenValid] = useState(false);

    useEffect(() => {
        const jwtToken = '';
        //Validate that current jwt token is valid
        //it it is  - show componentn with user details
        //if not show login button
        //Sent current jwt token to server via Authentication header
        fetch(`http://localhost:3001/validateToken`).then(res => res.json()).then((data) => {
            if (data.tokenIsValid) {
                setIsJwtTokenValid(true);
                setUserName('Rosti'); //In real scenario get this data from token itself
            } 
        }).catch(e => setIsJwtTokenValid(false))
    }, []);

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
