import React from 'react';

class ModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            picture_url: "",
            manufacturers: [],
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data["manufacturer_id"] = data["manufacturer"]
        delete data.manufacturer;
        delete data.manufacturers;
        delete data.success;
        
        const modelUrl = "http://localhost:8100/api/models/";
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
                name: "",
                picture_url: "",
                manufacturer: "",
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
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        };
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-5">
                        <h1>New Vehicle Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3 mt-3">
                                <input value={this.state.name} onChange={this.handleFieldChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.picture_url} onChange={this.handleFieldChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.manufacturer} onChange={this.handleFieldChange} required id="manufacturer" name="manufacturer" className="form-select">
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"}>
                            Wonderful, A new vehicle model has been added! 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModelForm;

