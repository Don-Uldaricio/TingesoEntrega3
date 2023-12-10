package tingeso.backendentrega3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.services.BloqueAsignaturaService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/bloques-asignatura")
public class BloqueAsignaturaController {

    @Autowired
    private BloqueAsignaturaService bloqueAsignaturaService;

    @GetMapping
    public List<BloqueAsignatura> getAll() {
        return bloqueAsignaturaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloqueAsignatura> getById(@PathVariable Long id) {
        return bloqueAsignaturaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/por-tomar")
    public ResponseEntity<List<BloqueAsignatura>> getBloquesPorTomar(@RequestBody List<PlanEstudio> ramosPorTomar) {
        return ResponseEntity.ok(bloqueAsignaturaService.getBloquesPorTomar(ramosPorTomar));
    }

    @PostMapping
    public ResponseEntity<List<BloqueAsignatura>> addBloquesHorario(@RequestBody List<BloqueAsignatura> bloquesHorario) {
        List<BloqueAsignatura> bloques = bloqueAsignaturaService.findByCodAsig(bloquesHorario.get(0).getCod_asig());
        for (BloqueAsignatura b: bloques) {
            bloqueAsignaturaService.deleteById(b.getId_bloque_asignatura());
        }
        for (BloqueAsignatura b: bloquesHorario) {
            bloqueAsignaturaService.save(b);
        }
        return ResponseEntity.ok(bloquesHorario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloqueAsignatura> update(@PathVariable Long id, @RequestBody BloqueAsignatura details) {
        return bloqueAsignaturaService.findById(id)
                .map(existingBloqueHorario -> {
                    existingBloqueHorario.setCod_asig(details.getCod_asig());
                    existingBloqueHorario.setDia(details.getDia());
                    existingBloqueHorario.setBloque(details.getBloque());
                    BloqueAsignatura updated = bloqueAsignaturaService.save(existingBloqueHorario);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return bloqueAsignaturaService.findById(id)
                .map(record -> {
                    bloqueAsignaturaService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
