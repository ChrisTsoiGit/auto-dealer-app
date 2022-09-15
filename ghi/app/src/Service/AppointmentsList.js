import React from 'react';


class AppointmentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({appointments: data.appointments});
            }
        } catch (e) {
            console.error(e);
        }        
    }

    async handleCancel(id) {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
                method: "delete"
            }
        const response = await fetch(cancelUrl, fetchConfig);
        if (response.ok) {
            window.location.reload()
        }
    }

    async handleFinished(id) {
        const finishedUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ is_finished: true }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishedUrl, fetchConfig);
        if (response.ok) {
            window.location.reload()
        }
    }   

    render () {
        return (
            <div>
                <h2 className="mt-5"><b>Appointments</b></h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>VIP</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(appointment => {
                            let finished = "";
                            if (appointment.is_finished === true) {
                                finished = "d-none";
                            }
                            return (<tr className={finished} key={ appointment.id }>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.vip ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg> : " " }
                                    </td>
                                    <td>{ appointment.owner }</td>
                                    <td>{ new Date(appointment.date).toLocaleDateString() }</td>
                                    <td>{ new Date(appointment.date).toLocaleTimeString() }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>
                                        <button onClick={ () => { this.handleCancel(appointment.id)}} className="btn btn-danger">Cancel</button>
                                        <button onClick={ () => { this.handleFinished(appointment.id)}} className="btn btn-success">Finished</button>
                                    </td>
                            </tr>
                            )
                        })}    
                    </tbody>
                </table>    
            </div>
        )
    }

}
export default AppointmentsList;
