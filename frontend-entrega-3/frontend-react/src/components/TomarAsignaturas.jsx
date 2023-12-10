import React, { useState, useEffect } from 'react';
import '../App.css'

const TomarRamos = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [asignaturasPorTomar, setAsignaturasPorTomar] = useState([]);
  const [horariosSeleccionados, setHorariosSeleccionados] = useState({ bloques: {}, coloresAsignaturas: {} });
  const [horariosPorAgregar, setHorariosPorAgregar] = useState([]);

  const diasDeLaSemana = ['L', 'M', 'W', 'J', 'V'];
  const bloquesHorarias = ['8:15-9:35', '9:50-11:10', '11:25-12:45', 
                           '13:45-15:05', '15:20:16:40', '16:55-18:15', 
                           '18:45-20:05', '20:05-21:25', '21:25-22:45'];


  useEffect(() => {
    const asignaturasPorTomar = JSON.parse(localStorage.getItem('horariosAsignaturas')) || [];
    console.log("asignaturas por tomar", asignaturasPorTomar);
    setAsignaturas(asignaturasPorTomar);

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
  }, []);

  const generarColorAleatorio = () => {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
};

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  };

  const asignaturasFiltradas = asignaturasPorTomar.filter(asig =>
    asig.nom_asig.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlHorario = (asignaturaSeleccionada) => {
    console.log('Agregar al horario:', asignaturaSeleccionada);
    const nuevosHorarios = { ...horariosSeleccionados };

    // Asignar un color si la asignatura es nueva
    if (!nuevosHorarios.coloresAsignaturas[asignaturaSeleccionada.cod_asig]) {
        nuevosHorarios.coloresAsignaturas[asignaturaSeleccionada.cod_asig] = generarColorAleatorio();
    }

    // Buscar todas las asignaturas que coincidan con el cod_asig de la asignatura seleccionada
    const asignaturasRelacionadas = asignaturasPorTomar.filter(asig => asig.cod_asig === asignaturaSeleccionada.cod_asig);
    console.log("asignaturas relacionadas", asignaturasRelacionadas);

    const asignaturasPorAgregar = asignaturas.filter(asig => asig.cod_asig === asignaturaSeleccionada.cod_asig);
    console.log("asignaturas por agregar", asignaturasPorAgregar);

    // Agregar los horarios de todas las asignaturas relacionadas
    asignaturasRelacionadas.forEach(asig => {
        asig.horario.split(', ').forEach(horario => {
            const [dia, bloque] = horario.split('-');
            if (!nuevosHorarios.bloques[dia]) {
                nuevosHorarios.bloques[dia] = {};
            }
            nuevosHorarios.bloques[dia][bloque] = asig.cod_asig;
        });
    });

    // Concatenar las asignaturas relacionadas con los horarios seleccionados
    const nuevosHorariosSeleccionados = [...horariosPorAgregar, ...asignaturasPorAgregar];
    setHorariosPorAgregar(nuevosHorariosSeleccionados);
    console.log("horarios por agregar", nuevosHorariosSeleccionados);

    console.log(asignaturasRelacionadas);
    setHorariosSeleccionados(nuevosHorarios);
    console.log(horariosSeleccionados);
};

  return (
    <div className='flex flex-row items-center h-[100%]'>
        <div className='container ramos overflow-y-scroll mx-auto ml-5 p-6'>
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
                        className='w-[30%] bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded'
                    >
                        Agregar al Horario
                    </button>
                </li>
            ))}
        </ul>
        </div>
        <div className='h-[100%] w-[110%] mx-8 bg-white shadow rounded-lg'>
            <div className="container p-6">
                <div className="grid grid-cols-6 gap-2">
                    <div className="col-span-1"></div> {/* Espacio para las bloques horarias */}
                    {diasDeLaSemana.map(dia => (
                    <div key={dia} className="font-medium text-center">{dia}</div>
                    ))}
                    {bloquesHorarias.map((bloque, indexBloque) => (
                        <>
                            <div key={bloque} className="flex justify-center items-center text-center">{bloque}</div>
                            {diasDeLaSemana.map(dia => {
                                const bloqueIndex = String(indexBloque + 1);
                                const codAsig = horariosSeleccionados.bloques[dia] && horariosSeleccionados.bloques[dia][bloqueIndex];
                                const colorFondo = codAsig ? horariosSeleccionados.coloresAsignaturas[codAsig] : '';

                                return (
                                    <div key={dia + indexBloque} className={`flex border justify-center items-center rounded-md h-9 border-gray-200 p-2 text-center ${colorFondo ? 'text-gray-900' : ''}`} style={{ backgroundColor: colorFondo }}>
                                        {codAsig}
                                    </div>
                                );
                            })}
                        </>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default TomarRamos;
