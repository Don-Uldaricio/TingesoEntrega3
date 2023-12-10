package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.repositories.PlanEstudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanEstudioService {

    @Autowired
    private PlanEstudioRepository planEstudioRepository;

    @Autowired
    private BloqueAsignaturaService bloqueAsignaturaService;

    public List<PlanEstudio> findAll() {
        return planEstudioRepository.findAll();
    }

    public PlanEstudio findById(Long id) {
        return planEstudioRepository.findById(id).orElse(null);
    }

    public PlanEstudio save(PlanEstudio planEstudio) {
        return planEstudioRepository.save(planEstudio);
    }

    public void deleteById(Long id) {
        planEstudioRepository.deleteById(id);
    }

    public List<BloqueAsignatura> getBloquesHorario(Integer codigo) {
        return bloqueAsignaturaService.findByCodAsig(codigo);
    }

}

