import React from 'react';


class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "",
            year: "",
            vin: "",
            models: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data["model_id"] = data["model"];
        delete data.model;
        delete data.models;
        delete data.success;
        delete data.failed;

        const modelUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelUrl, fetchConfig);

        if (response.ok) {
         
            const cleared = {
                color: "",
                year: "",
                vin: "",
                model: "",
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


    async componentDidMount() {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({models: data.models});
        };
    }


    render(){
        return(
            <div>
                <h2 className="mt-5"><b>New Automobile</b></h2>
                <form onSubmit={this.handleSubmit} id="create-shoes-form">
                    <div className="form-floating mb-3">
                        <input value={this.state.color} onChange={this.handleFieldChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.year} onChange={this.handleFieldChange} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={this.state.vin} onChange={this.handleFieldChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                        <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="mb-3">
                        <select value={this.state.model} onChange={this.handleFieldChange} required id="model" name="model" className="form-select">
                            <option value="">Choose a model</option>
                            {this.state.models.map(model => {
                                return (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                <div className={this.state.success ? "alert alert-success mt-4" : "d-none"} id="success-message">
                    Congratulations! You just added a new Car!
                </div>
                <div className={this.state.failed ? "alert alert-danger mt-4" : "d-none"} id="success-message">
                    Sorry, VIN number already exist, please try again...
                </div>
            </div>
        )
    }
}

export default AutomobileForm;
