import React, { useEffect, useState } from 'react';
import VehicleInfo from '../../Fake-data/data.json';
import Header from '../Header/Header';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(VehicleInfo);
    }, []);
    return (
        <div className="container home-body">
            <Header/>
            <div className="vehicle">
                {
                    vehicles.map(vehicle => <Vehicle vehicle={vehicle} />)
                }
            </div>
        </div>
    );
};

export default Home;