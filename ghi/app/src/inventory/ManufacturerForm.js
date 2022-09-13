import React from 'react';


class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            manufacturers: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.manufacturers;
        delete data.success;
        delete data.fail

        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturersUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            const cleared = {
                name: '',
                success: true,
                fail: false
            };
            this.setState(cleared);

        }else{this.setState({fail: true, success: false});}
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
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>New Manufacturer</h1>
                    <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.name} onChange={this.handleFieldChange} placeholder="Manufacturer Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={this.state.success ? "alert alert-success mt-4" : "d-none"}>
                        Wonderful, A new Manufacturer has been added!
                    </div>
                    <div className={this.state.fail ? "alert alert-danger mt-4" : "d-none"}>
                        Oops, the manufacturer already exist, please try a new one
                    </div>
                </div>
                </div>
            </div>
        )
        
    }
}

export default ManufacturerForm;