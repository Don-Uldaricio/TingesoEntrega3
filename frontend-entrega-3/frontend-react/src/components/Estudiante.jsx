import React from 'react';
import Layout from './Layout.jsx';
import { useParams } from 'react-router-dom';
import '../App.css'

const Estudiante = () => {
    const { rut } = useParams();

    return (
        <Layout>
        <p>{rut}</p>
        </Layout>
    );
};

export default Estudiante;
