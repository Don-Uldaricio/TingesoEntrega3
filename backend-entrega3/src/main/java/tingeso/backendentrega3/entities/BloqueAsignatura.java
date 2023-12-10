package tingeso.backendentrega3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "bloque_asignatura")
@NoArgsConstructor
@AllArgsConstructor
public class BloqueAsignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_bloque_asignatura;
    private Integer cod_asig;
    private String nom_asig;
    private String dia;
    private Integer bloque;
}