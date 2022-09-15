import React from 'react';


class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: "",
            owner: "",
            date: "",
            reason: "",
            technicians: [],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        delete data.success;

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                vin: "",
                owner: "",
                date: "",
                reason: "",
                technician: "",
                success: true,
            };
            this.setState(cleared);
        } else {
            this.setState({success: false})
        }
    
    }

    handleFieldChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians});
        };
    }
    
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-5">
                        <h1>New Service Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3 mt-3">
                                <input value={this.state.vin} onChange={this.handleFieldChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="name">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.owner} onChange={this.handleFieldChange} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                                <label htmlFor="picture_url">Owner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.date} onChange={this.handleFieldChange} placeholder="Date and Time" required type="datetime-local" name="date" id="date" className="form-control" />
                                <label htmlFor="starts">Date and Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.reason} onChange={this.handleFieldChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.technician} onChange={this.handleFieldChange} required id="technician" name="technician" className="form-select">
                                    <option value="">Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        return (
                                            <option key={technician.employee_number} value={technician.employee_number}>
                                                {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"}>
                            Wonderful, A new service appointment has been added!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppointmentForm;
