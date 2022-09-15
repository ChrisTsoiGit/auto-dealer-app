import React from 'react';


class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            employee_number: "",
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.success;
        delete data.fail;
        
        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                name: "",
                employee_number: "",
                success: true,
                fail: false,
            };
            this.setState(cleared);
        } else {
            this.setState({success: false, fail: true})
        }
    }
    
    handleFieldChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-5">
                        <h1>New Technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3 mt-3">
                                <input value={this.state.name} onChange={this.handleFieldChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employee_number} onChange={this.handleFieldChange} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"}>
                            Wonderful, a new technician has been added!
                        </div>
                        <div className={this.state.fail ? "alert alert-danger mt-4" : "d-none"}>
                            Oop! Please try again...
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TechnicianForm;
