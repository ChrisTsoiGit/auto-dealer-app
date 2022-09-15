import React from 'react';


class SalesList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            records: []
        }
    }


    async componentDidMount() {
        const url = "http://localhost:8090/api/records/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({records: data.sales_records});
        };
    }


    render() {
        return (
            <div>
                <h2 className="mt-3"><b>Sales Record</b></h2>
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th>Purchaser's Name</th>
                            <th>Automobile VIN</th>
                            <th>Sales Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.records.map(record => {
                            return (
                                <tr key={record.id}>
                                    <td>{ record.sales_person.name }</td>
                                    <td>{ record.sales_person.employee_number }</td>
                                    <td>{ record.customer.name }</td>
                                    <td>{ record.vin.vin }</td>
                                    <td>{ record.price }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SalesList;
