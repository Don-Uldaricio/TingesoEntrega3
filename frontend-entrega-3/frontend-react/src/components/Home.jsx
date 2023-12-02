import React, { useState } from 'react';
import Layout from './Layout.jsx';

const Home = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí manejas el envío del formulario, por ejemplo, enviando los datos a un servidor.
        console.log('Correo:', correo, 'Contraseña:', password);
    };

    return (
        <Layout>
        <div className="m-auto flex justify-center items-center min-h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className=' text-center mb-7 font-thin'>Bienvenido!</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                    </label>
                    <input 
                        className="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="correo" 
                        type="text" 
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    </label>
                    <input 
                        className="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className=" bg-usach-ultra-800 hover:bg-usach-ultra-900 text-lg text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                        type="submit">
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
        </Layout>
    );
};

export default Home;
