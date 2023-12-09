package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.Estudiante;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private CarreraService carreraService;

    @Autowired
    private PlanEstudioService planEstudioService;

    public List<Estudiante> findAll() {
        return estudianteRepository.findAll();
    }

    public Estudiante findById(Long id) {
        return estudianteRepository.findById(id).orElse(null);
    }

    public Estudiante findByRut(String rut) {
        return estudianteRepository.findByRut(rut);
    }

    public Estudiante save(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    public void deleteById(Long id) {
        estudianteRepository.deleteById(id);
    }

    public String getNombreCarrera(Integer codigo) {
        return carreraService.findByCodigo(codigo).getNombre_carrera();
    }

    public List<PlanEstudio> getPlanesEstudio(Integer codigo) {
        List<PlanEstudio> ramos = planEstudioService.findAll();
        List<PlanEstudio> ramosCarrera = new ArrayList<>();
        for (PlanEstudio p: ramos) {
            if (Objects.equals(p.getCod_carr(), codigo)) {
                ramosCarrera.add(p);
            }
        }
        return ramosCarrera;
    }
}
