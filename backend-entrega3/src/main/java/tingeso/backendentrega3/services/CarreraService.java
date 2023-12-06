package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.Carrera;
import tingeso.backendentrega3.repositories.CarreraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarreraService {

    @Autowired
    private CarreraRepository carreraRepository;

    public List<Carrera> findAll() {
        return carreraRepository.findAll();
    }

    public Carrera findById(Long id) {
        return carreraRepository.findById(id).orElse(null);
    }

    public Carrera save(Carrera carrera) {
        return carreraRepository.save(carrera);
    }

    public void deleteById(Long id) {
        carreraRepository.deleteById(id);
    }

    // Puedes agregar más métodos según las necesidades del negocio
}
