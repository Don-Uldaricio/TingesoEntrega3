package tingeso.backendentrega3.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "prerrequisito")
@NoArgsConstructor
@AllArgsConstructor
public class Prerrequisito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_prerreq;
    private Integer cod_asig;
    private Integer cod_prerreq;
}
