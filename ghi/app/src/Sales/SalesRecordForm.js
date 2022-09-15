import React from 'react';


class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: "",
            salespeople: [],
            customers: [],
            automobilevo: [],
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.salespeople;
        delete data.customers;
        delete data.automobilevo;
        delete data.success;

        const personUrl = "http://localhost:8090/api/records/";
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
                price: "",
                sales_person: "",
                customer: "",
                vin: "",
                success: true,
            };
            this.setState(cleared);

        }else{this.setState({success: false});}
    }


    handleFieldChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }


    async componentDidMount() {
        const eles = {
            "salespeople": "sales_people",
            "customers": "customers",
            "automobilevo": "automobiles"}
        for (const key of Object.keys(eles)) {
            const url = `http://localhost:8090/api/${key}/`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const val = eles[key]
                this.setState({[key]: data[val]});
            };
        }
    }

        
       
    
    render() {
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-5">
                        <h1>New Sales Record</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoes-form">

                            <div className="form-floating mb-3 mt-3">
                                <input value={this.state.price} onChange={this.handleFieldChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>

                            <div className="mb-3">
                                <select value={this.state.sales_person} onChange={this.handleFieldChange} required id="sales_person" name="sales_person" className="form-select">
                                    <option value="">Choose a sales people</option>
                                    {this.state.salespeople.map(salesperson => {
                                        return (
                                            <option key={salesperson.employee_number} value={salesperson.employee_number}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select value={this.state.customer} onChange={this.handleFieldChange} required id="customer" name="customer" className="form-select">
                                    <option value="">Choose a customers</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.phone_number} value={customer.phone_number}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select value={this.state.vin} onChange={this.handleFieldChange} required id="vin" name="vin" className="form-select">
                                    <option value="">Choose a automobile</option>
                                    {this.state.automobilevo.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className={this.state.success ? "alert alert-success mt-4" : "d-none"} id="success-message">
                            Congrats! You just sold a car!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesRecordForm;
