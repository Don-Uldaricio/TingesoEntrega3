package tingeso.backendentrega3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "plan_estudio")
@NoArgsConstructor
@AllArgsConstructor
public class PlanEstudio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_plan;
    private Integer cod_carr;
    private String cod_plan;
    private Integer nivel;
    private Integer cod_asig;
    private String nom_asig;
}
