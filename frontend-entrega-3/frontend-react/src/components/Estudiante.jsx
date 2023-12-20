import { useLocation } from 'react-router-dom';
import '../App.css'
import estudianteService from '../services/EstudianteService.js';
import { useState, useEffect } from 'react';
import DashboardEstudiante from './DashboardEstudiante.jsx';
import MallaCurricular from './MallaCurricular.jsx';
import PerfilEstudiante from './PerfilEstudiante.jsx';
import TomarRamos from './TomarAsignaturas.jsx';
import HorarioEstudiante from './HorarioEstudiante.jsx';
import axios from 'axios';

const Estudiante = () => {
    const location = useLocation();
    const estudiante = location.state?.estudiante;

    const [mostrarCarga, setMostrarCarga] = useState(true);
    const [modalPerfil, setModalPerfil] = useState(null);
    const [modalHorario, setModalHorario] = useState(null);
    const [modalRamos, setModalRamos] = useState(null);
    const [modalMalla, setModalMalla] = useState(null);
    const [carrera, setCarrera] = useState(null);
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignaturasCursadas, setAsignaturasCursadas] = useState([]);
    const [asignaturasPorTomar, setAsignaturasPorTomar] = useState([]);
    const [horariosAsignaturas, setHorariosAsignaturas] = useState([]);
    const [datosEstudianteCargados, setDatosEstudianteCargados] = useState(false);

    const handleButtonSelect = (modalName) => {
        setModalPerfil(modalName === 'Perfil' ? true : null);
        setModalHorario(modalName === 'Horario' ? true : null);
        setModalMalla(modalName === 'Malla' ? true : null);
        setModalRamos(modalName === 'Tomar Ramos' ? true : null);
    };

    useEffect(() => {
        localStorage.clear();
        const fetchDatosEstudiante = async () => {
            try {
                // Obtenemos datos estudiante
                const responseCarrera = await estudianteService.getCarrera(estudiante.cod_carr);
                setCarrera(responseCarrera.data);
                console.log(responseCarrera.data);

                const responseAsignaturas = await estudianteService.getAsignaturas(estudiante.cod_carr);
                setAsignaturas(responseAsignaturas.data);
                console.log("response asignaturas",responseAsignaturas.data);

                const responseNotas = await estudianteService.getNotas(estudiante.rut);
                console.log(responseNotas.data);
                setAsignaturasCursadas(responseNotas.data);

                const responseHorarioEstudiante = await axios.get(`http://localhost:8080/bloques-estudiante/horario/${estudiante.rut}`);
                console.log("horario estudiante",responseHorarioEstudiante.data.length);
                if (responseHorarioEstudiante.data.length !== 0) {
                    localStorage.setItem('horarioEstudiante', JSON.stringify(responseHorarioEstudiante.data));
                    localStorage.setItem('ramosInscritos', true);
                    // Crear una lista de códigos únicos
                    const codigosUnicos = new Set(responseHorarioEstudiante.data.map(item => item.cod_asig));
                    console.log(codigosUnicos);
                    const listaFiltrada = responseAsignaturas.data.filter(asignatura => 
                        codigosUnicos.has(asignatura.cod_asig));
                    console.log("lista filtrada", listaFiltrada);

                    // Crear la lista datosAsignatura
                    const datosAsignatura = Array.from(listaFiltrada).map(item => {
                    return {
                        cod_asig: item.cod_asig,
                        nom_asig: item.nom_asig,
                        color_asig: generarColorAleatorio()
                    };
                    });
                    localStorage.setItem('asignaturasHorario', JSON.stringify(datosAsignatura));
                }

            } catch (error) {
                console.error("Hubo un error al obtener los datos del estudiante:", error);
            }
        };

        if (estudiante) {
            fetchDatosEstudiante().then(() => {
                setTimeout(() => {
                    setDatosEstudianteCargados(true);
                    setMostrarCarga(false); // Desactiva la pantalla de carga después de 1 segundo
                }, 10);
            });
        }
    }, [estudiante]);

    useEffect(() => {
        const fetchAsignaturasPorTomar = async () => {
            try {
                // Crear una lista de asignaturas por tomar
                const asignaturasPorTomar = [];
    
                // Agregar asignaturas cursadas con nota menor a 3.95 desde la lista 'asignaturas'
                asignaturasCursadas.forEach(asigCursada => {
                    if (asigCursada.nota < 3.95) {
                        const asignaturaCorrespondiente = asignaturas.find(asig => asig.cod_asig === asigCursada.cod_asig);
                        if (asignaturaCorrespondiente) {
                            asignaturasPorTomar.push(asignaturaCorrespondiente);
                        }
                    }
                });
    
                // Agregar asignaturas que no han sido cursadas
                asignaturas.forEach(asig => {
                    const fueCursada = asignaturasCursadas.some(asigCursada => asigCursada.cod_asig === asig.cod_asig);
                    if (!fueCursada) {
                        asignaturasPorTomar.push(asig);
                    }
                });
    
                console.log(asignaturasPorTomar);
                setAsignaturasPorTomar(asignaturasPorTomar);

                const respuestaHorarios = await axios.post('http://localhost:8080/bloques-asignatura/por-tomar', asignaturasPorTomar);
                console.log(respuestaHorarios.data);
                setHorariosAsignaturas(respuestaHorarios.data);
            } catch (error) {
                console.error("Hubo un error al obtener las asignaturas por tomar:", error);
            }
        }
        if (datosEstudianteCargados) {
            fetchAsignaturasPorTomar();
        }
    }, [asignaturas, asignaturasCursadas, datosEstudianteCargados]);    

    const generarColorAleatorio = () => {
        // Genera un número aleatorio entre 100 y 255 para cada componente de color
        const generarComponenteClaro = () => Math.floor(Math.random() * 156) + 100;
    
        const rojo = generarComponenteClaro();
        const verde = generarComponenteClaro();
        const azul = generarComponenteClaro();
    
        // Convierte cada componente a un valor hexadecimal y los une para formar el color
        const color = `#${rojo.toString(16)}${verde.toString(16)}${azul.toString(16)}`;
        return color;
    };

    // Guardamos los datos obtenidos en el localStorage
    localStorage.setItem('estudiante', JSON.stringify(estudiante));
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
    localStorage.setItem('asignaturasCursadas', JSON.stringify(asignaturasCursadas));
    localStorage.setItem('carrera', JSON.stringify(carrera));
    localStorage.setItem('asignaturasPorTomar', JSON.stringify(asignaturasPorTomar));
    localStorage.setItem('horariosAsignaturas', JSON.stringify(horariosAsignaturas));

    return (
        <div className='main-estudiante flex flex-col h-full bg-gray-100'>
            {mostrarCarga ? (
            <div className='m-auto' role="status">
                <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        ) : (
            <>
                <DashboardEstudiante onButtonSelect={handleButtonSelect}/>
                {!modalHorario && !modalPerfil && !modalMalla && !modalRamos &&
            <div className='flex-1 flex-col items-center text-center'>
                <p className='w-full flex-1 text-center font-light mb-3 text-3xl text-usach-industrial-1000'>Bienvenido/a {estudiante.nombres}!</p>
                <p className='w-full flex-1 text-center font-light text-xl text-usach-industrial-1000'>Para comenzar elige una opción del menú a la izquierda</p>
                </div>}
            {modalPerfil && <div className='flex-1 items-center justify-center'><PerfilEstudiante/></div>}

            {modalHorario &&
            <div className='flex-1 flex-row items-center justify-center'><HorarioEstudiante/></div>}

            {modalMalla && 
            <div className='flex-1 flex-col items-center justify-center'>
                <MallaCurricular/>
                <div className='mx-9 mt-5 flex flex-row gap-10 font-light'>
                    <div className='flex flex-row items-center gap-3'><div className='h-5 w-5 bg-usach-aqua-700'></div>Asignaturas aprobadas</div>
                    <div className='flex flex-row items-center gap-3'><div className='h-5 w-5 bg-usach-rouge-700'></div>Asignaturas reprobadas</div>
                    <div className='flex flex-row items-center gap-3'><div className='h-5 w-5 bg-usach-daisy-700'></div>Asignaturas inscritas</div>
                </div>
            </div>}

            {modalRamos && 
            <div className='ramos flex-1 flex-row overflow-y-hidden items-center justify-center'>
                <TomarRamos/>
            </div>}
            </>
        )}
            
        </div>
        
    );
};

export default Estudiante;
