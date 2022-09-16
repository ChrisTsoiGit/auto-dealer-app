import React from 'react';


class AppointmentHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            key: "",
        };
        this.handleKeyChange = this.handleKeyChange.bind(this);
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

    handleKeyChange(event) {
        const value = event.target.value;
        this.setState({key: value})
    }

    render () {
        return (
            <div>
                <form id="search-by-vin-form">
                    <div className="input-group mb-3 mt-5">
                        <input value={this.state.key} onChange={this.handleKeyChange} 
                        type="text" className="form-control" 
                        placeholder="Search by VIN" id="key" name="key" />
                            <button className="input-group-text"><b>Search by VIN</b></button>
                    </div>
                </form>   
                <h2 className="mt-5"><b>Service Appointments History</b></h2>
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
                            let ignored = "";
                            if (appointment.vin !== this.state.key && (this.state.key).length > 0) {
                                ignored = "d-none";
                            }
                            return (
                                <tr key={ appointment.id } className={ignored}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.vip ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg> : " "}
                                    </td>
                                    <td>{ appointment.owner }</td>
                                    <td>{ new Date(appointment.date).toLocaleDateString() }</td>
                                    <td>{ new Date(appointment.date).toLocaleTimeString() }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                </tr>
                            )
                        })}    
                    </tbody>
                </table>    
            </div>  
        )
    }
}
export default AppointmentHistory;
