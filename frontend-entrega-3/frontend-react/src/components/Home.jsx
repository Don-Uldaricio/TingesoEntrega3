import Layout from './Layout.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [modalEstudiante, setModalEstudiante] = useState(false);
    const [rut, setRut] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const portalEstudiante = () => {
        navigate(`/estudiante/${rut}`);
    }

    const verificarRut = (event) => {
        event.preventDefault();
        if (rut.trim()) {
            portalEstudiante();
        } else {
          setError('Por favor, ingrese un RUT válido.');
        }
      };

    return (
        <Layout>
        {!modalEstudiante &&
        <div v-if="!modalEstudiante" className="flex justify-center items-center">
            <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 my-4">
                <div className=' text-center mb-7 font-light text-xl'>Bienvenido a toma de ramos DIINF!</div>
                <div className=' text-center mb-7 font-light text-lg'>¿Cómo deseas ingresar?</div>
                <div className="flex flex-row gap-5 items-center justify-between">
                <button className=" bg-usach-ultra-800 hover:bg-usach-terra-700 transition text-center ease-in-out text-lg text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                    type='button'
                    onClick={() => setModalEstudiante(true)}>
                    Estudiante
                </button>
                <a className=" bg-usach-ultra-800 hover:bg-usach-terra-700 transition text-center ease-in-out text-lg text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                    href="/docente">
                    Docente
                </a>
                </div>
            </form>
        </div>
        }

        {modalEstudiante ? (
            <>
                <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 my-4 w-96">
                    <div className="mb-4">
                        <p className="block text-lg font-light mb-2 text-center" htmlFor="email">
                            Ingrese un RUT
                        </p>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="rut" 
                        placeholder="RUT"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}/>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-6">
                        <button className='text-usach-rouge-800 hover:text-usach-rouge-1000 transition ease-in-out font-semibold' onClick={() => setModalEstudiante(false)}>VOLVER</button>
                        <button className="bg-usach-ultra-800 hover:bg-usach-terra-700 text-white transition font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                        onClick={verificarRut}>
                            INGRESAR
                        </button>
                    </div>
                </form>
                {error && <p>Rut inválido. Ingrese otro.</p>}
            </>
        ) : null}
        </Layout>
    );
};

export default Home;

