package tingeso.backendentrega3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso.backendentrega3.entities.BloqueEstudiante;
import tingeso.backendentrega3.repositories.BloqueEstudianteRepository;

import java.util.List;
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

    // Otros métodos útiles...
}
