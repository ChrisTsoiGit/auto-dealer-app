import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobilesList from './inventory/AutomobilesList';
import ManufacturersList from './inventory/ManufacturersList';
import ManufacturerForm from './inventory/ManufacturerForm';
import ModelForm from './inventory/ModelForm';
import ModelsList from './inventory/ModelsList';
import AppointmentsList from './Service/AppointmentsList';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentHistory from './Service/AppointmentHistory';
import TechniciansList from './Technician/TechnicianList';
import TechnicianForm from './Technician/TechnicianForm';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesList from './Sales/SalesRecordList';
import CustomerForm from './Sales/CustomerForm';
import SalesRecordForm from './Sales/SalesRecordForm';
import SalesPersonHistory from './Sales/SalesPersonHistory';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="sales">
            <Route index element={<SalesList/>} />
            <Route path="new" element={<SalesPersonForm/>} />
            <Route path="customer" element={<CustomerForm/>} />
            <Route path="record" element={<SalesRecordForm/>} />
            <Route path="history" element={<SalesPersonHistory/>} />
            
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList/>} />
            <Route path="new" element={<AutomobileForm/>} />
          </Route> 
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerForm />} />  
          </Route>
          <Route path="models">
            <Route index element={<ModelsList />} />
            <Route path="new" element={<ModelForm />} />  
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentsList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistory />} />          
          </Route>
          <Route path="technician">
            <Route index element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />          
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
