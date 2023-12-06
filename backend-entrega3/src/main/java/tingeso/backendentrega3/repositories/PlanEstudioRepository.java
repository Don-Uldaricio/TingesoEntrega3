package tingeso.backendentrega3.repositories;

import tingeso.backendentrega3.entities.PlanEstudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanEstudioRepository extends JpaRepository<PlanEstudio, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
}
