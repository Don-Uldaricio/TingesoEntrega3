package tingeso.backendentrega3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "nota")
@NoArgsConstructor
@AllArgsConstructor
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_nota;
    private Integer anio;
    private Integer sem;
    private String cod_alumno;
    private Integer cod_asig;
    private Double nota;
}
