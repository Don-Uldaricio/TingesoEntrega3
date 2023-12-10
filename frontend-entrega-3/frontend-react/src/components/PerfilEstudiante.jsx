// Ejemplo para Perfil.jsx
import React, { useEffect, useState } from 'react';

const PerfilEstudiante = () => {
  const [estudiante, setEstudiante] = useState(null);
  const [carrera, setCarrera] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      const e = localStorage.getItem('estudiante');
      setEstudiante(JSON.parse(e));

      const c = localStorage.getItem('carrera');
      setCarrera(JSON.parse(c));
    };

    fetchPerfil();
  }, []);

  // Comprobamos si estudiante es null antes de renderizar
  if (!estudiante) {
    return <div className='text-center'>Cargando...</div>; // O cualquier otro contenido que desees mostrar mientras se carga
  }

  return (
  <div className='grid grid-cols-2 gap-4 mx-36 items-center align-top justify-center text-center'>
    <div className='flex flex-row gap-5 bg-white items-center text-left py-3 px-4 shadow rounded-lg'>
      <div className='flex bg-usach-ultra-600 h-20 w-20 rounded-full'></div>
      <div>
        <p>{estudiante.nombres} {estudiante.apellidos}</p>
        <p>{estudiante.rut}</p>
        <p>{estudiante.email}</p>
        <p>{carrera}</p>
      </div>
    </div>
    <div className=' shadow bg-white p-4 rounded-lg'>
      <p>{estudiante.nombres} {estudiante.apellidos}</p>
    </div>
    <div className=' bg-white shadow p-4 rounded-lg'>
      <p>{estudiante.nombres} {estudiante.apellidos}</p>
    </div>
  </div>);
};

export default PerfilEstudiante;
