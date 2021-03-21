import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { VehicleContext } from '../../App';
import './Vehicle.css'

const Vehicle = (props) => {
    const { name, img } = props.vehicle;
    const [vehicleType, setVehicleType] = useContext(VehicleContext);
    setVehicleType(name);

    return (
        <nav>
            <Link to="/destination">
                <div className="container vehicle-card">
                    <Card style={{ width: '15rem', height: '15rem' }}>
                        <Card.Img variant="top" src={img} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </Link>
        </nav>

    );
};

export default Vehicle;