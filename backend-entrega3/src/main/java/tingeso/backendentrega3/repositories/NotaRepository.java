package tingeso.backendentrega3.repositories;

import tingeso.backendentrega3.entities.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
}
