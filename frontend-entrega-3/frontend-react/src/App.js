import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Estudiante from './components/Estudiante'
import Docente from './components/Docente';
import RegistrarPago from './components/RegistrarPago';
import ImportarNotas from './components/ImportarNotas';
import PagoExitoso from './components/PagoExitoso';
import IngresoExitoso from './components/IngresoExitoso';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docente" element={<Docente />} />
          <Route path="/estudiante/:rut" element={<Estudiante />} />
          <Route path="/registrar-pago" element={<RegistrarPago />} />
          <Route path="/importar-notas" element={<ImportarNotas />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/ingreso-exitoso" element={<IngresoExitoso />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
