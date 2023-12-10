package tingeso.backendentrega3.controllers;

import tingeso.backendentrega3.entities.BloqueAsignatura;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.services.PlanEstudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/planes-estudio")
public class PlanEstudioController {

    @Autowired
    private PlanEstudioService planEstudioService;

    @GetMapping
    public ResponseEntity<List<PlanEstudio>> getAllPlanesEstudio() {
        return ResponseEntity.ok(planEstudioService.findAll());
    }

    @GetMapping("/{id}")
    public PlanEstudio getPlanEstudioById(@PathVariable Long id) {
        return planEstudioService.findById(id);
    }

    @GetMapping("/bloques-horario/{codigo}")
    public ResponseEntity<List<BloqueAsignatura>> getBloquesHorario(@PathVariable("codigo") Integer codigo) {
        return ResponseEntity.ok(planEstudioService.getBloquesHorario(codigo));
    }

    @PostMapping
    public PlanEstudio createPlanEstudio(@RequestBody PlanEstudio planEstudio) {
        return planEstudioService.save(planEstudio);
    }

    @PutMapping("/{id}")
    public PlanEstudio updatePlanEstudio(@PathVariable Long id, @RequestBody PlanEstudio planEstudio) {
        // Aquí debes asegurarte de que el plan de estudio con el ID proporcionado exista
        // y luego actualizarlo con los nuevos datos
        return planEstudioService.save(planEstudio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanEstudio(@PathVariable Long id) {
        planEstudioService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Puedes agregar más endpoints según las necesidades
}
