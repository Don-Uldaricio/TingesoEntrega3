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
    <div className='flex flex-col gap-2 items-center'>
      <div className='flex flex-col gap-5 bg-white items-center text-left py-3 px-4 shadow rounded-lg'>
        <p className='w-full text-left font-semibold text-2xl text-usach-industrial-1000'>Información Personal</p>
        <div className='flex flex-row gap-5 items-center'>
      <div className='flex bg-usach-ultra-600 h-20 w-20 rounded-full'></div>
      <div>
        <p>{estudiante.nombres} {estudiante.apellidos}</p>
        <p>{estudiante.rut}</p>
        <p>{estudiante.email}</p>
        <p>{carrera}</p>
      </div>
  </div>
      </div>
      
    </div>
  );
};

export default PerfilEstudiante;
