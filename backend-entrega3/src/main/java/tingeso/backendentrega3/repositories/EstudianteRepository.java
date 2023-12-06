package tingeso.backendentrega3.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tingeso.backendentrega3.entities.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    @Query("select e from Estudiante e where e.rut = :rut")
    Estudiante findByRut(@Param("rut")String rut);
}
