import React, { useState, useEffect } from 'react';

const MallaCurricular = () => {
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const asignaturasGuardadas = localStorage.getItem('asignaturas');
    if (asignaturasGuardadas) {
      setAsignaturas(JSON.parse(asignaturasGuardadas));
    }
  }, []);

  const asignaturasPorNivel = asignaturas.reduce((acc, asignatura) => {
    acc[asignatura.nivel] = acc[asignatura.nivel] || [];
    acc[asignatura.nivel].push(asignatura);
    return acc;
  }, {});

  const niveles = Object.keys(asignaturasPorNivel).sort((a, b) => a - b);

  return (
    <div className='overflow-x-auto mx-6'>
  <table className=' border-separate' style={{ borderSpacing: '10px' }}>
    <thead className=' bg-usach-industrial-400'>
      <tr>
        {niveles.map((nivel, index) => (
          <th 
            key={nivel} 
            className={`px-5 py-3 text-xs font-semibold text-usach-industrial-1000 uppercase tracking-wider text-center`}
          >
            Nivel {nivel}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: Math.max(...Object.values(asignaturasPorNivel).map(asigs => asigs.length)) }).map((_, idx) => (
        <tr key={idx}>
          {niveles.map((nivel, index) => (
            <td 
              key={nivel} 
              className={`px-3 py-2 bg-white text-sm text-center rounded-md`}
            >
              <p className='text-gray-900 whitespace-no-wrap'>
                {asignaturasPorNivel[nivel][idx]?.nom_asig || '-'}
              </p>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


  );
};

export default MallaCurricular;
