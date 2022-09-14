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



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} /> 
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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
