package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.Prerrequisito;
import tingeso.backendentrega3.repositories.PrerrequisitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrerrequisitoService {

    @Autowired
    private PrerrequisitoRepository prerrequisitoRepository;

    public List<Prerrequisito> findAll() {
        return prerrequisitoRepository.findAll();
    }

    public Prerrequisito findById(Long id) {
        return prerrequisitoRepository.findById(id).orElse(null);
    }

    public Prerrequisito save(Prerrequisito prerrequisito) {
        return prerrequisitoRepository.save(prerrequisito);
    }

    public void deleteById(Long id) {
        prerrequisitoRepository.deleteById(id);
    }

    // Puedes agregar más métodos según las necesidades del negocio
}
