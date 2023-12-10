package tingeso.backendentrega3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "bloque_estudiante")
@NoArgsConstructor
@AllArgsConstructor
public class BloqueEstudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_bloque_estudiante;
    private String rut;
    private Integer cod_asig;
    private String dia;
    private Integer bloque;
}
