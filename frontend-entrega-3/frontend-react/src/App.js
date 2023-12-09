import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Estudiante from './components/Estudiante'
import Docente from './components/Docente';
import NavBar from './components/NavBar';
import PerfilEstudiante from './components/PerfilEstudiante';
import MallaCurricular from './components/MallaCurricular';

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docentes" element={<Docente />} />
          <Route path="/estudiantes" element={<Estudiante />} />
          <Route path="/perfil" element={<PerfilEstudiante />} />
          <Route path="/malla-curricular" element={<MallaCurricular />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
