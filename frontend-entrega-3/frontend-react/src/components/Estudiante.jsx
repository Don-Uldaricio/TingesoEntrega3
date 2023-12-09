import { useLocation } from 'react-router-dom';
import '../App.css'
import estudianteService from '../services/EstudianteService.js';
import { useState, useEffect } from 'react';
import DashboardEstudiante from './DashboardEstudiante.jsx';
import MallaCurricular from './MallaCurricular.jsx';
import PerfilEstudiante from './PerfilEstudiante.jsx';

const Estudiante = () => {
    const location = useLocation();
    let estudiante = location.state?.estudiante;

    const [modalPerfil, setModalPerfil] = useState(null);
    const [modalHorario, setModalHorario] = useState(null);
    const [modalRamos, setModalRamos] = useState(null);
    const [modalMalla, setModalMalla] = useState(null);
    const [carrera, setCarrera] = useState(null);
    const [asignaturas, setAsignaturas] = useState([]);

    // Guardamos los datos obtenidos en el localStorage
    localStorage.setItem('estudiante', JSON.stringify(estudiante));
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
    localStorage.setItem('carrera', JSON.stringify(carrera));

    const handleButtonSelect = (modalName) => {
        setModalPerfil(modalName === 'Perfil' ? true : null);
        setModalHorario(modalName === 'Horario' ? true : null);
        setModalMalla(modalName === 'Malla' ? true : null);
        setModalRamos(modalName === 'Tomar Ramos' ? true : null);
    };

    useEffect(() => {
        const fetchDatosEstudiante = async () => {
            try {
                // Obtenemos datos estudiante
                const responseCarrera = await estudianteService.getCarrera(estudiante.cod_carr);
                setCarrera(responseCarrera.data);

                const responseAsignaturas = await estudianteService.getAsignaturas(estudiante.cod_carr);
                setAsignaturas(responseAsignaturas.data);
                console.log(responseAsignaturas.data);
            } catch (error) {
                console.error("Hubo un error al obtener los datos del estudiante:", error);
            }
        };

        if (estudiante && estudiante.cod_carr) {
            fetchDatosEstudiante();
        }
    }, [estudiante]);

    return (
        <div className='main-estudiante flex flex-col h-full bg-gray-100'>
            <DashboardEstudiante onButtonSelect={handleButtonSelect}/>
            {!modalHorario && !modalPerfil && !modalMalla && 
            <p className='flex-1 text-center font-light text-3xl text-usach-industrial-1000'>Bienvenido/a {estudiante.nombres}!</p>}
            {modalPerfil && <div className='flex-1 items-center justify-center'><PerfilEstudiante/></div>}

            {modalHorario &&
            <div className=''>Horario</div>}

            {modalMalla && <div className='flex-1 items-center justify-center'><MallaCurricular/></div>}

            {modalRamos &&
            <div className=''>Ramos</div>}
            
        </div>
        
    );
};

export default Estudiante;
