import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalHorario from './ModalHorario'; // Asegúrate de que este componente también esté estilizado con Tailwind

const GestorAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchAsignaturas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/planes-estudio');
        setAsignaturas(response.data.map(asig => ({
          id: asig.cod_asig,
          nombre: asig.nom_asig,
          cod_plan: asig.cod_plan // Añadir cod_plan aquí
        })));
      } catch (error) {
        console.error('Error al obtener las asignaturas:', error);
      }
    };
  
    fetchAsignaturas();
  }, []);  

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  };

  const abrirModalHorario = (asignatura) => {
    setAsignaturaSeleccionada(asignatura);
    localStorage.setItem('asignaturaSeleccionada', JSON.stringify(asignatura));
    console.log(asignatura);
    setModalVisible(true);
  };

  const guardarHorario = (horario) => {
    setModalVisible(false);
  };

  const asignaturasFiltradas = busqueda.length === 0
    ? asignaturas
    : asignaturas.filter(asignatura =>
        asignatura.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );

  return (
    <div className='flex flex-col w-[50%] p-4 bg-white font-light shadow-md rounded-lg px-8 pt-6 pb-8 my-4'>
      <input
        type="text"
        placeholder="Buscar asignatura..."
        value={busqueda}
        onChange={handleInputChange}
        className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
      />
      <ul className='mt-4'>
        <li className='flex justify-between items-center border-b border-gray-200 p-2 font-bold'>
          <span>Nombre Asignatura</span>
          <span>Plan de estudio</span>
          <span className='opacity-0'>Acciones</span> {/* Espacio invisible para alinear el botón */}
        </li>
        {asignaturasFiltradas.map(asignatura => (
          <li key={asignatura.id} className='flex justify-between items-center border-b border-gray-200 p-2'>
            <span className='font-normal w-[30%]'>{asignatura.nombre}</span>
            <span className='font-normal'>{asignatura.cod_plan}</span>
            <button 
              onClick={() => abrirModalHorario(asignatura)}
              className='bg-usach-ultra-700 transition hover:bg-usach-terra-700 text-white font-normal py-2 px-4 rounded-lg'
            >
              Agregar Horario
            </button>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <ModalHorario
          asignatura={asignaturaSeleccionada}
          cerrarModal={() => setModalVisible(false)}
          guardarHorario={guardarHorario}
        />
      )}
    </div>
  );
};

export default GestorAsignaturas;
