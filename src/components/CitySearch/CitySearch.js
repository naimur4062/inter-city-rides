import React, { useContext, useEffect, useState } from 'react';
import { PickupContext, VehicleContext } from '../../App';
import './CitySearch.css';
import GoogleImg from '../../images/Map.png';
import VehicleTypeInfo from '../../Fake-data/data.json';
import Header from '../Header/Header';

const CitySearch = () => {
    const [pick, setPick] = useContext(PickupContext);
    const [vehicleType, setVehicleType] = useContext(VehicleContext);
    console.log("type", vehicleType)

    const [vehicleByNames, setVehicleByNames] = useState([]);
    useEffect(() => {
        setVehicleByNames(VehicleTypeInfo);
    }, []);

    let vehicle = {};
    vehicleByNames.map(vehicleByName => {
        if (vehicleByName.name === vehicleType) {
            vehicle = { ...vehicle, vehicleByName };
            console.log(vehicle)
        }
    })

    return (
        <div>
            <Header/>
            <div className="container d-flex justify-content-evenly mt-5 mb-5">
                <div className="searchResult">
                    <div className="search-result">
                        <p>From: {pick.pickFrom}</p>
                        <p>To: {pick.pickTo}</p>
                    </div>
                    <div className="bookingInfo d-flex mt-2">
                        <img src={vehicle?.vehicleByName?.img} alt="img"/>
                        <p>{vehicle?.vehicleByName?.name}</p>
                        <p>{vehicle?.vehicleByName?.person}</p>
                        <p>${vehicle?.vehicleByName?.cost}</p>
                    </div>
                    <div className="bookingInfo d-flex mt-2">
                        <img src={vehicle?.vehicleByName?.img} alt="img"/>
                        <p>{vehicle?.vehicleByName?.name}</p>
                        <p>{vehicle?.vehicleByName?.person}</p>
                        <p>${vehicle?.vehicleByName?.cost}</p>
                    </div>
                    <div className="bookingInfo d-flex mt-2">
                        <img src={vehicle?.vehicleByName?.img} alt="img"/>
                        <p>{vehicle?.vehicleByName?.name}</p>
                        <p>{vehicle?.vehicleByName?.person}</p>
                        <p>${vehicle?.vehicleByName?.cost}</p>
                    </div>
                  
                </div>
                <div className="google-map">
                    <img src={GoogleImg} alt="" />
                </div>
            </div>
        </div>

    );
};

export default CitySearch;