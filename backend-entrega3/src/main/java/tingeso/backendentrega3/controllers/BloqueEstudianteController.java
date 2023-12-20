package tingeso.backendentrega3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.BloqueEstudiante;
import tingeso.backendentrega3.services.BloqueEstudianteService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/bloques-estudiante")
public class BloqueEstudianteController {

    @Autowired
    private BloqueEstudianteService bloqueEstudianteService;

    @GetMapping
    public List<BloqueEstudiante> getAll() {
        return bloqueEstudianteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloqueEstudiante> getById(@PathVariable Long id) {
        return bloqueEstudianteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BloqueEstudiante create(@RequestBody BloqueEstudiante bloqueEstudiante) {
        return bloqueEstudianteService.save(bloqueEstudiante);
    }

    @GetMapping("/horario/{rut}")
    public ResponseEntity<List<BloqueEstudiante>> getHorarioEstudiante(@PathVariable("rut") String rut) {
        return ResponseEntity.ok(bloqueEstudianteService.getHorarioEstudiante(rut));
    }

    @PostMapping("/inscribir-ramos/{rut}")
    public ResponseEntity<List<BloqueEstudiante>> inscribirRamos(@RequestBody List<BloqueAsignatura> bloques, @PathVariable("rut") String rut) {
        return ResponseEntity.ok(bloqueEstudianteService.inscribirAsignaturas(bloques, rut));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloqueEstudiante> update(@PathVariable Long id, @RequestBody BloqueEstudiante details) {
        return bloqueEstudianteService.findById(id)
                .map(existingBloqueEstudiante -> {
                    existingBloqueEstudiante.setRut(details.getRut());
                    existingBloqueEstudiante.setCod_asig(details.getCod_asig());
                    existingBloqueEstudiante.setDia(details.getDia());
                    existingBloqueEstudiante.setBloque(details.getBloque());
                    BloqueEstudiante updated = bloqueEstudianteService.save(existingBloqueEstudiante);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return bloqueEstudianteService.findById(id)
                .map(record -> {
                    bloqueEstudianteService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
