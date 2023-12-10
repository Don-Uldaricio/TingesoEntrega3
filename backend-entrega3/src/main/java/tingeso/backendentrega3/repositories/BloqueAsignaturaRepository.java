package tingeso.backendentrega3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tingeso.backendentrega3.entities.BloqueAsignatura;

import java.util.List;

public interface BloqueAsignaturaRepository extends JpaRepository<BloqueAsignatura, Long> {
    @Query("select b from BloqueAsignatura b where b.cod_asig = :cod_asig")
    List<BloqueAsignatura> findByCodAsig(@Param("cod_asig")Integer cod_asig);
}
