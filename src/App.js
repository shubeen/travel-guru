import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import InfoComing from './Component/InfoComing/InfoComing';
import Booking from './Component/Booking/Booking';
import SearchPlace from './Component/SearchPlace/SearchPlace';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import NotFound from './Component/NotFound/NotFound';


 export const SelectContext= createContext([]);

function App() {
  const [placeSelect, setPlaceSelect] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
    
    <SelectContext.Provider value ={[loggedInUser,setLoggedInUser, placeSelect,setPlaceSelect]}>
      
       <Router>
        
        <Switch>
          <Route  path = '/home'>
            <Home></Home>
          </Route>
          <Route exact path="/">
              <Home/>
            </Route>
          <Route  path = '/booking'>
            <Booking></Booking>
          </Route>
          <PrivateRoute  path = '/searchPlace'>
            <SearchPlace></SearchPlace>
          </PrivateRoute>
          <Route  path = '/login'>
            <Login></Login>
          </Route>
          <Route  path = '/destination'>
             <InfoComing></InfoComing>
          </Route>
          
            <Route  path = '/contact'>
             <InfoComing></InfoComing>
          </Route>
          <Route  path = '*'>
             <NotFound/>
          </Route>
        </Switch>
      </Router>
      </SelectContext.Provider>    
   
  );
}

export default App;
