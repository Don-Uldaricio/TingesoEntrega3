import React from 'react';
import '../App.css'
import BuscadorAsignaturas from './GestorAsignaturas.jsx';

const Docente = () => {

    return (
        <div className='main pt-5 flex flex-col bg-gray-100'>
            <p className=' font-bold text-3xl text-usach-industrial-1000'>Gestor de Asignaturas</p>
            <BuscadorAsignaturas />
        </div>
    );
};

export default Docente;