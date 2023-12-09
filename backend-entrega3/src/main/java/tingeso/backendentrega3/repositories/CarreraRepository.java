package tingeso.backendentrega3.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tingeso.backendentrega3.entities.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backendentrega3.entities.Estudiante;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {
    @Query("select c from Carrera c where c.codigo = :codigo")
    Carrera findByCodigo(@Param("codigo")Integer codigo);
}
