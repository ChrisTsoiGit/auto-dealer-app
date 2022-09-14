import React from 'react'
import { useState, useEffect } from 'react';

function AutomobilesList() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8100/api/automobiles/";
        try {
            fetch(url)
                .then(resq => resq.json())
                .then(data => setVehicles(data.autos))
        }
        catch (e) { console.log("automobiles fetch error!") }
    }, [])



    return (
        <div>
            <h1 className="mt-3">Automobiles:</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Model</th>
                        <th scope="col">Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => {
                        return (
                            <tr key={vehicle.vin}>
                                <td>{vehicle.vin}</td>
                                <td>{vehicle.color}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.model.name}</td>
                                <td>{vehicle.model.manufacturer.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AutomobilesList;
