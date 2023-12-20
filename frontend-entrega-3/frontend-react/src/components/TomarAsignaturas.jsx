import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

const TomarRamos = () => {
    const [estudiante, setEstudiante] = useState(null);
  const [asignaturas, setAsignaturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [asignaturasPorTomar, setAsignaturasPorTomar] = useState([]);
  const [horariosPorAgregar, setHorariosPorAgregar] = useState([]);
  const [topeHorario, setTopeHorario] = useState(false);
  const [colores, setColores] = useState([]);
  const [modalExito, setModalExito] = useState(false);
  const [ramosInscritos, setRamosInscritos] = useState(null);
  const [modalMinimoRamos, setModalMinimoRamos] = useState(false);

  const diasDeLaSemana = ['L', 'M', 'W', 'J', 'V'];
  const bloquesHorarias = ['8:15-9:35', '9:50-11:10', '11:25-12:45', 
                           '13:45-15:05', '15:20:16:40', '16:55-18:15', 
                           '18:45-20:05', '20:05-21:25', '21:25-22:45'];


  useEffect(() => {
    const ramosInscritos = JSON.parse(localStorage.getItem('ramosInscritos'));
    console.log(ramosInscritos);
    setRamosInscritos(ramosInscritos);
    console.log("colores", colores);
    const asignaturasPorTomar = JSON.parse(localStorage.getItem('horariosAsignaturas')) || [];
    console.log("asignaturas por tomar", asignaturasPorTomar);
    setAsignaturas(asignaturasPorTomar);
    const estudiante = JSON.parse(localStorage.getItem('estudiante'));
    setEstudiante(estudiante);

    const porTomar = Object.values(asignaturasPorTomar.reduce((acc, asig) => {
        // Si no existe el código en el acumulador, inicialízalo
        if (!acc[asig.cod_asig]) {
            acc[asig.cod_asig] = { cod_asig: asig.cod_asig, nom_asig: asig.nom_asig, horarios: [] };
        }
    
        // Agrega el par día-bloque al array de horarios
        acc[asig.cod_asig].horarios.push(`${asig.dia}-${asig.bloque + 1}`);
    
        return acc;
    }, {})).map(item => {
        // Convierte el array de horarios en un string separado por comas
        return {
            ...item,
            horario: item.horarios.join(', ')
        };
    });
    
    setAsignaturasPorTomar(porTomar);
  }, [colores]);

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

const cerrarTopeHorario = () => {
    setTopeHorario(false);
  };

  const cerrarModalExito = () => {
    setModalExito(false);
    setRamosInscritos(true);
    localStorage.setItem('ramosInscritos', true);
  };

  const cerrarMinimoRamos = () => {
    setModalMinimoRamos(false);
  }

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  };

  const asignaturasFiltradas = asignaturasPorTomar.filter(asig =>
    asig.nom_asig.toLowerCase().includes(busqueda.toLowerCase())
  );

  function concatenarListas(horariosPorAgregar, asignaturasPorAgregar) {
    let topeHorarioLocal = false;
    // Verifica si algún elemento de asignaturasPorAgregar tiene el mismo día y bloque
    // que algún elemento de horariosPorAgregar.
    for (let asignatura of asignaturasPorAgregar) {
        for (let horario of horariosPorAgregar) {
            if (asignatura.dia === horario.dia && asignatura.bloque === horario.bloque) {
                setTopeHorario(true);
                topeHorarioLocal = true;
                break;
            }
        }
        if (topeHorarioLocal) break;
    }
    // Si no hay tope de horario, concatena las listas
    if (!topeHorarioLocal) {
        let nuevoColor = '';
        nuevoColor = generarColorAleatorio();
        setColores([...colores, { cod_asig: asignaturasPorAgregar[0].cod_asig, 
            color_asig: nuevoColor, 
            nom_asig: asignaturasPorAgregar[0].nom_asig}]);
        const horarioPrueba = horariosPorAgregar.concat(asignaturasPorAgregar);
        console.log("Bloques agregados con éxito", horarioPrueba);
        return horariosPorAgregar.concat(asignaturasPorAgregar);
    } else {
        console.log("Hay un tope de horario, no se pueden concatenar las listas.", horariosPorAgregar);
        return horariosPorAgregar; // O retornar lo que consideres apropiado
    }
}

    // Función para obtener el color correspondiente a un código de asignatura
  const getColor = (cod_asig) => {
    const color = colores.find(color => color.cod_asig === cod_asig);
    return color ? color.color_asig : 'transparent';
  };

  const agregarAlHorario = (asignaturaSeleccionada) => {

    const asignaturasPorAgregar = asignaturas.filter(asig => asig.cod_asig === asignaturaSeleccionada.cod_asig);
    console.log("asignaturas por agregar", asignaturasPorAgregar);

    // Concatenar las asignaturas relacionadas con los horarios seleccionados
    const nuevosHorariosSeleccionados = concatenarListas(horariosPorAgregar, asignaturasPorAgregar);
    console.log("horarios por agregar", nuevosHorariosSeleccionados);
    setHorariosPorAgregar(nuevosHorariosSeleccionados);
};

const quitarDelHorario = (codAsig) => {
    // Filtra las asignaturas que tienen un código diferente al codAsig
    const nuevosHorariosPorAgregar = horariosPorAgregar.filter(asignatura => asignatura.cod_asig !== codAsig);
    // Actualiza el estado de horariosPorAgregar
    setHorariosPorAgregar(nuevosHorariosPorAgregar);

    // Filtra los colores que tienen un código diferente al codAsig
    const nuevosColores = colores.filter(color => color.cod_asig !== codAsig);
    // Actualiza el estado de colores
    setColores(nuevosColores);
};

const inscribirAsignaturas = () => {
    if (colores.length < 3) {
        setModalMinimoRamos(true);
    }
    else {
        axios.post(`http://localhost:8080/bloques-estudiante/inscribir-ramos/${estudiante.rut}`, horariosPorAgregar )
      .then(response => {
        // Maneja la respuesta de la solicitud aquí
        console.log('Solicitud POST exitosa:', response.data);
        setModalExito(true);
        localStorage.setItem('horarioEstudiante', JSON.stringify(response.data));
        localStorage.setItem('asignaturasHorario', JSON.stringify(colores));
        // Puedes realizar otras acciones después de una respuesta exitosa
      })
      .catch(error => {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error al realizar la solicitud POST:', error);
        // Puedes mostrar un mensaje de error al usuario u otras acciones
      });
    }
  };  

  if (ramosInscritos) {
    return <div className='flex mx-auto'>
        <p className='w-full text-center font-light text-3xl text-usach-industrial-1000'>Tus asignaturas ya fueron inscritas!</p>
    </div>
  }

  return (
    <div className='tomar-ramos flex flex-row items-start mt-7 h-[100%]'>
        <div className='container ramos mx-auto ml-5 p-6'>
        <p className=' font-bold text-2xl text-usach-industrial-1000 mb-5'>Asignaturas Disponibles</p>
        <div className='mb-4'>
            <input
            type="text"
            placeholder="Buscar asignatura..."
            value={busqueda}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
        <ul className='space-y-2'>
            <li className='flex flex-row items-center border-b border-gray-200 p-2 font-bold text-usach-industrial-1000'>
                <span className='w-[32%]'>Nombre Asignatura</span>
                <span className='w-[7%] mr-10'>Código</span>
                <span className='w-[31%] mr-6'>Horario</span>
                <span className='w-[30%] opacity-0'>Acciones</span>
            </li>
            {asignaturasFiltradas.map(asignatura => (
                <li key={asignatura.id} className='flex flex-row items-center bg-white shadow p-4 rounded-lg'>
                    <span className='w-[32%]'>{asignatura.nom_asig}</span>
                    <span className='w-[7%] mr-10'>{asignatura.cod_asig}</span>
                    <span className='w-[31%] mr-6'>{asignatura.horario}</span>
                    <button 
                        onClick={() => agregarAlHorario(asignatura)}
                        className='w-[30%] bg-usach-ultra-700 hover:bg-usach-ultra-900 transition text-white font-bold py-2 px-4 rounded'
                    >
                        Agregar al Horario
                    </button>
                </li>
            ))}
        </ul>
        </div>
        <div className='horario-interactivo w-[110%] flex flex-col mx-8  gap-4 overflow-x-hidden'>
            <div className="container p-6 bg-white rounded-lg shadow">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"></th> {/* Ajusta el ancho según necesidades */}
                            {diasDeLaSemana.map(dia => (
                                <th key={dia} className="border px-6 py-3 text-center text-sm font-medium text-usach-industrial-1000 uppercase tracking-wider w-1/6"> {/* Ajusta el ancho para el resto de las columnas */}
                                    {dia}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {bloquesHorarias.map((bloque, index) => (
                            <tr key={bloque} className="border-b">
                                <td className="border-r py-2 w-1/12 text-overflow-ellipsis overflow-hidden whitespace-nowrap">{bloque}</td>
                                {diasDeLaSemana.map(dia => {
                                    const horario = horariosPorAgregar.find(h => h.dia === dia && h.bloque === index);
                                    const bgColor = horario ? getColor(horario.cod_asig) : 'transparent';
                                    return (
                                        <td key={dia} style={{ backgroundColor: bgColor }} className="border-r px-6 py-2 w-1/6 text-overflow-ellipsis overflow-hidden whitespace-nowrap">
                                            {horario ? horario.cod_asig : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {horariosPorAgregar.length > 0 &&
            <div className='container flex flex-col gap-4 ramos mx-auto mb-1 p-6 shadow rounded-lg bg-white' style={{ maxHeight: 'calc(60vh - 220px)' }}>
            <ul className='flex flex-col overflow-auto'>
                <li className='flex flex-row items-center border-b border-gray-200 p-2 font-semibold text-sm text-usach-industrial-700'>
                    <span className='w-[40%]'>Nombre Asignatura</span>
                    <span className='w-[7%] mr-10'>Código</span>
                    <span className='w-[53%] opacity-0'>Acciones</span>
                </li>
                {colores.map((item, index) => (
                    <li key={index} className="flex flex-row items-center border-b border-gray-200 p-2">
                        <span className='w-[40%]'>{item.nom_asig}</span>
                        <span className='w-[7%] mr-10 text-center'>{item.cod_asig}</span>
                        <span className='flex w-[53%] justify-end'>
                        <button
                            onClick={() => quitarDelHorario(item.cod_asig)}
                            className="bg-usach-rouge-700 hover:bg-usach-rouge-900 transition text-white font-bold py-2 px-2 rounded"
                        >
                            Quitar del Horario
                        </button>
                        </span>
                    </li>
                ))}
            </ul>
            <button onClick={inscribirAsignaturas} className=' bg-usach-terra-800 hover:bg-usach-terra-1000 rounded transition font-bold py-2 text-white'>Inscribir Asignaturas</button>
            </div>
            }
        </div>
        {topeHorario &&
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
            <div className='flex flex-col p-5 md:w-1/2 lg:w-[20%] bg-white shadow-lg rounded-lg gap-3 items-center'>
                <img src="https://img.icons8.com/color/55/error--v1.png" alt="error--v1"/>
                <p className='text-center font-light mb-2'>Asignatura con tope de horario</p>
                <button onClick={cerrarTopeHorario} className=' bg-usach-terra-800 hover:bg-usach-terra-900 text-white font-medium py-2 px-4 rounded'>
                    Cerrar
                </button>
            </div>
        </div>}
        {modalExito &&
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
            <div className='flex flex-col p-5 md:w-1/2 lg:w-[20%] bg-white shadow-lg rounded-lg gap-3 items-center'>
            <img width="48" height="48" src="https://img.icons8.com/color/48/ok--v1.png" alt="ok--v1"/>
                <p className='text-center font-light mb-2'>Asignaturas inscritas con éxito!</p>
                <button onClick={cerrarModalExito} className=' bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded'>
                    Cerrar
                </button>
            </div>
        </div>}
        {modalMinimoRamos &&
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
            <div className='flex flex-col p-5 md:w-1/2 lg:w-[20%] bg-white shadow-lg rounded-lg gap-3 items-center'>
                <img src="https://img.icons8.com/color/55/error--v1.png" alt="error--v1"/>
                <p className='text-center font-light mb-2'>Deben inscribirse al menos 3 asignaturas</p>
                <button onClick={cerrarMinimoRamos} className=' bg-usach-terra-800 hover:bg-usach-terra-900 text-white font-medium py-2 px-4 rounded'>
                    Cerrar
                </button>
            </div>
        </div>}
    </div>
  );
};

export default TomarRamos;
