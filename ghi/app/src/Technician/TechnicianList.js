import React from 'react';


class TechniciansList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            technicians: []
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/technicians/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.setState({technicians: data.technicians});
            }
        } catch (e) {
            console.error(e);
        }        
    }

    render () {
        return (
            <div>
                <h2 className="mt-5"><b>Technicians</b></h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.technicians.map(technician => {
                            return (
                                <tr key={ technician.id }>
                                    <td>{ technician.name }</td>
                                    <td>{ technician.employee_number}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TechniciansList;
