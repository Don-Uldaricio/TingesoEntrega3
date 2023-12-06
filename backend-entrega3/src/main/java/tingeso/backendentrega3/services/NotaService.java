package tingeso.backendentrega3.services;

import tingeso.backendentrega3.entities.Nota;
import tingeso.backendentrega3.repositories.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    public List<Nota> findAll() {
        return notaRepository.findAll();
    }

    public Nota findById(Long id) {
        return notaRepository.findById(id).orElse(null);
    }

    public Nota save(Nota nota) {
        return notaRepository.save(nota);
    }

    public void deleteById(Long id) {
        notaRepository.deleteById(id);
    }

    // Puedes agregar más métodos según las necesidades del negocio
}
