package tingeso.backendentrega3.repositories;

import tingeso.backendentrega3.entities.Prerrequisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
}
