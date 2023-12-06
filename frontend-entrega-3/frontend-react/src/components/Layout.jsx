import React from 'react';
import '../App.css'

const Layout = ({ children }) => {
  return (
    <>
        <main className='main w-full m-auto bg-gray-100'>{children}</main>
    </>
  );
};

export default Layout;
