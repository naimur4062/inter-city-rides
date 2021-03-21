import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EmailUserContext, PickupContext, UserContext } from '../../App';
import './Destination.css';
import GoogleMap from '../../images/Map.png';

const Destination = () => {
    const [pick, setPick] = useContext(PickupContext);

    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const [emailUser, setEmailUser] = useContext(EmailUserContext);

    const newPick = { ...pick }
    const handleCityBlur = (e) => {
        if (e.target.name === 'pickFrom') {
            newPick[e.target.name] = e.target.value;
            setPick(newPick);
        }
        if (e.target.name === 'pickTo') {
            newPick[e.target.name] = e.target.value;
            setPick(newPick);
        }
    }
    const handleCitySubmit = () => {

    }

    return (
        <div>
            <div className='destination container d-flex justify-content-between mt-5'>
                <h2>Inter City Riders</h2>
                <div className="d-flex justify-content-end">
                    <nav>
                        <Link to="/home">Home</Link>
                        <Link to="/destination">Destination</Link>
                        <Link to="/">Blog</Link>
                        <Link to="/">Contact</Link>
                    </nav>
                    <p>{signedInUser.name}</p>
                    <p>{emailUser}</p>
                </div>
            </div>
            <div className="container mt-5">
                <div className=" d-flex mb-5">
                    <div className="container py-5">
                        <div className="row ">
                            <div className="searchAndResult">
                                <div className="col-sm-10">
                                    <form onSubmit={handleCitySubmit} className="bg-light p-3">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Pick From:
                                        </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City Name"
                                                required
                                                name="pickFrom"
                                                onBlur={handleCityBlur}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Pick To:
                                        </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City Name"
                                                required
                                                name="pickTo"
                                                onBlur={handleCityBlur}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            
                                            <input
                                                type="date"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 btn-div">
                                            <Link to="/result">
                                                <input type="submit" value="Search" className="btn form-control"/>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="google-map">
                        <img src={GoogleMap} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;