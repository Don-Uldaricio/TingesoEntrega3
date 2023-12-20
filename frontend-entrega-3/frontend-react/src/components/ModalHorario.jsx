import React, { useState, useEffect } from 'react';

const ModalHorario = ({ asignatura, cerrarModal }) => {
  const [seleccionesHorario, setSeleccionesHorario] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);
  const [modalExito, setModalExito] = useState(false);

  const diasDeLaSemana = ['L', 'M', 'W', 'J', 'V'];
  const franjasHorarias = ['8:15-9:35', '9:50-11:10', '11:25-12:45', 
                           '13:45-15:05', '15:20:16:40', '16:55-18:15', 
                           '18:45-20:05', '20:05-21:25', '21:25-22:45'];

  useEffect(() => {
  const asig = localStorage.getItem('asignaturaSeleccionada');
  if (asig) {
    setAsignaturaSeleccionada(JSON.parse(asig));
  }
}, []);

const enviarHorarios = async () => {
  try {
    const respuesta = await fetch('http://localhost:8080/bloques-asignatura', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seleccionesHorario),
    });

    if (respuesta.ok) {
      console.log('Horarios guardados con éxito');
      setModalExito(true);
    } else {
      console.error('Error al guardar los horarios:', respuesta.statusText);
      // Manejar errores de respuesta aquí
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error);
    // Manejar errores de red y otros errores aquí
  }
};

  const cerrarModalExito = () => {
    setModalExito(false);
    cerrarModal();
  }

  const seleccionarHorario = (dia, indiceHora) => {
  const seleccion = { dia, bloque: indiceHora, nom_asig: asignaturaSeleccionada.nombre, cod_asig: asignaturaSeleccionada.id };
  const yaSeleccionado = seleccionesHorario.some(h => h.dia === dia && h.bloque === indiceHora);

  if (yaSeleccionado) {
    setSeleccionesHorario(seleccionesHorario.filter(h => h.dia !== dia || h.bloque !== indiceHora));
  } else {
    setSeleccionesHorario([...seleccionesHorario, seleccion]);
  }
};
           

  const esHorarioSeleccionado = (dia, indiceHora) => {
  return seleccionesHorario.some(h => h.dia === dia && h.bloque === indiceHora);
};

  console.log(seleccionesHorario);

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      {!modalExito &&
      <div className='relative top-20 m-auto p-5 w-[40%] shadow-lg rounded-lg bg-white'>
      <h2 className='text-xl mb-2'>Ingresar Horarios para {asignatura.nombre}</h2>
      <table className='relative w-full border-separate border-spacing-1'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>Hora / Día</th>
            {diasDeLaSemana.map(dia => <th key={dia} className='py-3 px-6 text-left'>{dia}</th>)}
          </tr>
        </thead>
        <tbody className='text-usach-industrial-1000 font-light'>
        {franjasHorarias.map((hora, indiceHora) => (
          <tr key={hora} className='border-b border-gray-200 bg-gray-100 hover:bg-gray-100'>
            <td className='py-3 px-6 pl-9 text-left whitespace-nowrap'>{hora}</td>
            {diasDeLaSemana.map(dia => (
              <td
                key={dia + hora}
                onClick={() => seleccionarHorario(dia, indiceHora)}
                className={`cursor-pointer py-3 px-6 text-center ${esHorarioSeleccionado(dia, indiceHora) ? 'bg-green-500' : 'hover:bg-green-200'}`}
              >
                {/* Contenido de la celda */}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className='flex justify-end mt-4'>
        <button onClick={cerrarModal} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition'>Cerrar</button>
        <button onClick={enviarHorarios} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 transition'>Guardar</button>
      </div>
    </div>}
      {modalExito && 
      <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative flex flex-col top-80 m-auto mt-10 p-5 w-fit shadow-lg rounded-lg gap-4 bg-white'>
        <p>Horarios ingresados con éxito!</p>
        <button onClick={cerrarModalExito} className='bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded'>Cerrar</button>
      </div>
      </div>}
    </div>
  );
};

export default ModalHorario;
