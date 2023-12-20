import React, { useState, useEffect } from 'react';

const HorarioEstudiante = () => {
    const [horarioEstudiante, setHorarioEstudiante] = useState([]);
    const [asignaturasHorario, setAsignaturasHorario] = useState([]);

    const diasDeLaSemana = ['L', 'M', 'W', 'J', 'V'];
    const bloquesHorarias = ['8:15-9:35', '9:50-11:10', '11:25-12:45', 
                           '13:45-15:05', '15:20:16:40', '16:55-18:15', 
                           '18:45-20:05', '20:05-21:25', '21:25-22:45'];

    useEffect(() => {
        const horario = JSON.parse(localStorage.getItem('horarioEstudiante')) || [];
        const asignaturas = JSON.parse(localStorage.getItem('asignaturasHorario')) || [];
        console.log("horario",horario);
        console.log("asignaturas",asignaturas);
        if (horario) {
            setHorarioEstudiante(horario);
            setAsignaturasHorario(asignaturas);
        }
      }, []);

      const getColor = (cod_asig) => {
        const color = asignaturasHorario.find(color => color.cod_asig === cod_asig);
        return color ? color.color_asig : 'transparent';
      };

      return (
        <div className="container justify-center ml-e flex flex-row gap-8 p-6 m-3 rounded-lg mx-auto">
            <div className='bg-white w-[55%] p-6 rounded-lg shadow'>
            <p className='text-center w-full mb-4 text-2xl font-semibold text-usach-industrial-1000'>Mi Horario</p>
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
                                    const horario = horarioEstudiante.find(h => h.dia === dia && h.bloque === index);
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
            <div className="bg-white p-6 shadow rounded-lg">
                <p className='text-center w-full mb-4 text-2xl font-semibold text-usach-industrial-1000'>Lista de Asignaturas</p>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                            <th className="border px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Asignatura</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {asignaturasHorario.map(asignatura => (
                            <tr key={asignatura.cod_asig}>
                                <td className="flex flex-row gap-3 border-r px-6 py-2"><p className="border-r px-3 py-2" style={{ backgroundColor: asignatura.color_asig }}></p>{asignatura.nom_asig}</td>
                                <td className="border-r px-6 py-2">{asignatura.cod_asig}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
      );
};

export default HorarioEstudiante;