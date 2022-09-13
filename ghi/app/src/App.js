import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './inventory/ManufacturersList';
import ManufacturerForm from './inventory/ModelForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerForm />} />  
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
