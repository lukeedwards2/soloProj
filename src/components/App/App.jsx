import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ActiveBetsPage from '../ActiveBetsPage/ActiveBetsPage';
import AddBetPage from '../AddBetPage/AddBetPage';
import BetHistoryPage from '../BetHistoryPage/BetHistoryPage';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /active-bets page
              <Redirect to="/active-bets" />
              :
              // Otherwise, redirect to /login
              <Redirect to="/login" />
            }
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/active-bets" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>
          <Route
            exact
            path="/register"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/active-bets" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route path="/active-bets" element={<ActiveBetsPage />} />
          <Route path="/add-bet" element={<AddBetPage />} />
          <Route path="/bet-history" element={<BetHistoryPage />} />



          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;