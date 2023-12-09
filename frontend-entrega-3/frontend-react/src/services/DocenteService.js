import axios from "axios";

class DocenteService {
    pagarDocente(idRamo){
        return axios.get(`http://localhost:8080/docentes/ramos/${idRamo}`);
    }
}

const docenteService = new DocenteService();
export default DocenteService;