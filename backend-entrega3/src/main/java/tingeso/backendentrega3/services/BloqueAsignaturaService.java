package tingeso.backendentrega3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.repositories.BloqueAsignaturaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BloqueAsignaturaService {

    @Autowired
    private BloqueAsignaturaRepository bloqueAsignaturaRepository;

    public List<BloqueAsignatura> findAll() {
        return bloqueAsignaturaRepository.findAll();
    }

    public Optional<BloqueAsignatura> findById(Long id) {
        return bloqueAsignaturaRepository.findById(id);
    }

    public List<BloqueAsignatura> findByCodAsig(Integer codigo) {
        return bloqueAsignaturaRepository.findByCodAsig(codigo);
    }

    public BloqueAsignatura save(BloqueAsignatura bloqueAsignatura) {
        return bloqueAsignaturaRepository.save(bloqueAsignatura);
    }

    public void deleteById(Long id) {
        bloqueAsignaturaRepository.deleteById(id);
    }

    public List<BloqueAsignatura> getBloquesPorTomar(List<PlanEstudio> ramosPorTomar) {
        List<BloqueAsignatura> bloques = new ArrayList<>();
        for (PlanEstudio p: ramosPorTomar) {
            List<BloqueAsignatura> bloquesRamo = findByCodAsig(p.getCod_asig());
            bloques.addAll(bloquesRamo);
        }
        return bloques;
    }

}
