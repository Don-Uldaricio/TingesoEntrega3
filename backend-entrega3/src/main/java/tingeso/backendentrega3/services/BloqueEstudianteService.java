package tingeso.backendentrega3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.BloqueEstudiante;
import tingeso.backendentrega3.repositories.BloqueEstudianteRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BloqueEstudianteService {

    @Autowired
    private BloqueEstudianteRepository bloqueEstudianteRepository;

    public List<BloqueEstudiante> findAll() {
        return bloqueEstudianteRepository.findAll();
    }

    public Optional<BloqueEstudiante> findById(Long id) {
        return bloqueEstudianteRepository.findById(id);
    }

    public BloqueEstudiante save(BloqueEstudiante bloqueEstudiante) {
        return bloqueEstudianteRepository.save(bloqueEstudiante);
    }

    public void deleteById(Long id) {
        bloqueEstudianteRepository.deleteById(id);
    }

    public List<BloqueEstudiante> inscribirAsignaturas(List<BloqueAsignatura> bloquesA, String rut) {
        List<BloqueEstudiante> listaBloques = new ArrayList<>();
        for (BloqueAsignatura b: bloquesA) {
            BloqueEstudiante bloqueE = new BloqueEstudiante();
            bloqueE.setRut(rut);
            bloqueE.setCod_asig(b.getCod_asig());
            bloqueE.setDia(b.getDia());
            bloqueE.setBloque(b.getBloque());
            save(bloqueE);
            listaBloques.add(bloqueE);
        }
        return listaBloques;
    }

    public List<BloqueEstudiante> getHorarioEstudiante(String rut) {
        List<BloqueEstudiante> bloques = findAll();
        List<BloqueEstudiante> bloquesEstudiante = new ArrayList<>();
        for (BloqueEstudiante b: bloques) {
            if (Objects.equals(b.getRut(), rut)) {
                bloquesEstudiante.add(b);
                System.out.println(b.getCod_asig());
            }
        }
        return bloquesEstudiante;
    }
}
