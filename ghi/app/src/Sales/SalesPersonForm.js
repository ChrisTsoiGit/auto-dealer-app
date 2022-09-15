import React from 'react';


class SalesPersonForm extends React.Component {
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
        delete data.failed;
   
        const personUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(personUrl, fetchConfig);
        if (response.ok) {
            
            const cleared = {
                name: "",
                employee_number: "",
                success: true,
                failed: false
            };
            this.setState(cleared);
         
        }else{this.setState({failed: true, success: false});}
    }


    handleFieldChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }

    
    render() {
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-5">
                        <h1>New Sales Person</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoes-form">
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
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"} id="success-message">
                            Congratulations! You just hired a new Sales person!
                        </div>
                        <div className={this.state.failed ? "alert alert-danger mt-4" : "d-none"} id="success-message">
                            Sorry, please try again...
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesPersonForm;

