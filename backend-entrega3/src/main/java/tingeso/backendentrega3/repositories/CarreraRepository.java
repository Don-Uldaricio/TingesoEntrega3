package tingeso.backendentrega3.repositories;

import tingeso.backendentrega3.entities.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
}
