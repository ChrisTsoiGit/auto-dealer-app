import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a1">
                <b>Inventory</b>
              </p>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers </NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/new">Add New Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models">Models </NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/new">Add New Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles">Automobiles </NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/new">Add New Automobiles</NavLink></li>
              </ul>
            </li>
          
          <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a1">
                <b>Appointments</b>
              </p>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments </NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/new">Add New Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service Appointment History</NavLink></li>
              </ul>
          </li>

          <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a1">
                <b>Employees</b>
              </p>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/technician">Our technicians </NavLink></li>
                <li><NavLink className="dropdown-item" to="/technician/new">Add New technician</NavLink></li>
              </ul>
          </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
