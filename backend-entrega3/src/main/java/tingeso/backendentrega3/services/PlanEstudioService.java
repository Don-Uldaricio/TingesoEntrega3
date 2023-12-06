package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.repositories.PlanEstudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanEstudioService {

    @Autowired
    private PlanEstudioRepository planEstudioRepository;

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

    // Puedes agregar más métodos según las necesidades del negocio
}

