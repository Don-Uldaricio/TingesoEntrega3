import axios from "axios";

class EstudianteService {
    getEstudiantes() {
        return axios.get(`http://localhost:8080/estudiantes`)
    }

    getEstudiante(rut){
        return axios.get(`http://localhost:8080/estudiantes/${rut}`);
    }

    getCarrera(codigo_carrera){
        return axios.get(`http://localhost:8080/estudiantes/carrera/${codigo_carrera}`);
    }

    getAsignaturas(codigo_carrera) {
        return axios.get(`http://localhost:8080/estudiantes/planes-estudio/${codigo_carrera}`);
    }

    getNotas(rut) {
        return axios.get(`http://localhost:8080/estudiantes/notas/${rut}`);
    }

}

const estudianteService = new EstudianteService();
export default estudianteService;