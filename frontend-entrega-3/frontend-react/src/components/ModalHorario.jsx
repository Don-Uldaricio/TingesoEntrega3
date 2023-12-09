import React, { useState } from 'react';

const ModalHorario = ({ asignatura, cerrarModal, guardarHorario }) => {
  const [seleccionesHorario, setSeleccionesHorario] = useState([]);

  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const franjasHorarias = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  const seleccionarHorario = (dia, hora) => {
    const seleccion = { dia, hora };
    const yaSeleccionado = seleccionesHorario.some(h => h.dia === dia && h.hora === hora);

    if (yaSeleccionado) {
      setSeleccionesHorario(seleccionesHorario.filter(h => h.dia !== dia || h.hora !== hora));
    } else {
      setSeleccionesHorario([...seleccionesHorario, seleccion]);
    }
  };

  const esHorarioSeleccionado = (dia, hora) => {
    return seleccionesHorario.some(h => h.dia === dia && h.hora === hora);
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 m-auto p-5 w-[40%] shadow-lg rounded-lg bg-white'>
        <h2 className='text-xl mb-2'>Ingresar Horarios para {asignatura.nombre}</h2>
        <table className='relative w-full'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Hora / Día</th>
              {diasDeLaSemana.map(dia => <th key={dia} className='py-3 px-6 text-left'>{dia}</th>)}
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {franjasHorarias.map(hora => (
              <tr key={hora} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-6 pl-9 text-left whitespace-nowrap'>{hora}</td>
                {diasDeLaSemana.map(dia => (
                  <td
                    key={dia + hora}
                    onClick={() => seleccionarHorario(dia, hora)}
                    className={`cursor-pointer py-3 px-6 text-center ${esHorarioSeleccionado(dia, hora) ? 'bg-green-500' : 'hover:bg-green-200'}`}
                  >
                    {/* Contenido de la celda */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end mt-4'>
          <button onClick={() => guardarHorario(seleccionesHorario)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>Guardar</button>
          <button onClick={cerrarModal} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalHorario;
