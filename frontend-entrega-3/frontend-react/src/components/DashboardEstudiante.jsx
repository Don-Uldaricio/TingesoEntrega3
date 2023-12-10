import React from 'react';
import '../App.css'

const DashboardEstudiante = ({ onButtonSelect }) => {
  return (
    <div className='dashboard bg-usach-ultra-800 px-5 w-[11%] py-4 text-white'>
      <nav className='flex flex-col w-full gap-1'>
        <button 
        onClick={() => onButtonSelect('Perfil')}
        className='flex flex-row gap-1 items-center text-left hover:bg-usach-ultra-600 transition rounded-lg pl-2 py-1' >
          <img src="https://img.icons8.com/ios-glyphs/22/user--v1.png" className='invert' alt="user--v1"/>Perfil</button>
        <button 
        onClick={() => onButtonSelect('Horario')} 
        className='flex flex-row gap-1 items-center text-left hover:bg-usach-ultra-600 transition rounded-lg pl-2 py-1' >
          <img width="22" height="22" src="https://img.icons8.com/material/22/calendar--v1.png" alt="calendar--v1" className='invert'/>Horario</button>
        <button 
        onClick={() => onButtonSelect('Malla')} 
        className='flex flex-row gap-1 items-center text-left hover:bg-usach-ultra-600 transition rounded-lg pl-2 py-1' >
          <img width="22" height="22" src="https://img.icons8.com/ios-glyphs/22/todo-list--v1.png" alt="todo-list--v1" className='invert'/>Malla Curricular</button>
        <button 
        onClick={() => onButtonSelect('Tomar Ramos')} 
        className='flex flex-row gap-1 items-center text-left hover:bg-usach-ultra-600 transition rounded-lg pl-2 py-1' >
          <img src="https://img.icons8.com/ios-glyphs/22/plus--v1.png" className='invert' alt="plus--v1"/>Tomar Ramos</button>
      </nav>
    </div>
  );
};

export default DashboardEstudiante;
