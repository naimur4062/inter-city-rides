import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatched from './components/NoMatched/NoMatched';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CitySearch from './components/CitySearch/CitySearch';

export const VehicleContext = createContext();
export const PickupContext = createContext();
export const UserContext = createContext();
export const EmailUserContext = createContext();

function App() {
  const [vehicleType, setVehicleType] = useState('');
  const [pick, setPick] = useState({ pickFrom: '', pickTo: '' });
  const [emailUser, setEmailUser] = useState([]);
  const [signedInUser, setSignedInUser] = useState({});
  return (
    <VehicleContext.Provider value={[vehicleType, setVehicleType]}>
      <PickupContext.Provider value={[pick, setPick]}>
        <EmailUserContext.Provider value={[emailUser, setEmailUser]}>
          <UserContext.Provider value={[signedInUser, setSignedInUser]}>
            <Router>
              <Switch>
                <Route path="/home">
                  <Home></Home>
                </Route>
                <Route path="/login">
                  <Login></Login>
                </Route>
                <Route path="/result">
                  <CitySearch></CitySearch>
                </Route>
                <PrivateRoute path="/destination">
                  <Destination></Destination>
                </PrivateRoute>
                <Route exact path="/">
                  <Home></Home>
                </Route>
                <Route path="*">
                  <NoMatched></NoMatched>
                </Route>
              </Switch>
            </Router>
          </UserContext.Provider>
        </EmailUserContext.Provider>
      </PickupContext.Provider>
    </VehicleContext.Provider>
  );
}

export default App;
