package tingeso.backendentrega3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tingeso.backendentrega3.entities.BloqueEstudiante;

public interface BloqueEstudianteRepository extends JpaRepository<BloqueEstudiante, Long> {
    // Aquí puedes añadir métodos personalizados si es necesario
}
