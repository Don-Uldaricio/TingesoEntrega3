import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando react-router para la navegación

const NavBar = () => {
  return (
    <nav className="flex bg-usach-ultra-900 text-white p-3 justify-center font-bold">
      <ul className="flex flex-row w-[60%]">
        <li><Link to="/">
          <img src='UsachSB.png' alt='usach' className='h-12'/></Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
