package tingeso.backendentrega3.controllers;

import tingeso.backendentrega3.entities.Estudiante;
import tingeso.backendentrega3.entities.Nota;
import tingeso.backendentrega3.entities.PlanEstudio;
import tingeso.backendentrega3.services.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    public List<Estudiante> getAllEstudiantes() {
        return estudianteService.findAll();
    }

    @GetMapping("/{rut}")
    public ResponseEntity<Estudiante> getEstudianteByRut(@PathVariable("rut") String rut) {
        Estudiante estudiante = estudianteService.findByRut(rut);
        if(estudiante == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    @GetMapping("carrera/{codigo}")
    public ResponseEntity<String> getCarrera(@PathVariable("codigo") Integer codigo) {
        return ResponseEntity.ok(estudianteService.getNombreCarrera(codigo));
    }

    @GetMapping("/planes-estudio/{codigo}")
    public ResponseEntity<List<PlanEstudio>> getPlanesEstudio(@PathVariable("codigo") Integer codigo) {
        return ResponseEntity.ok(estudianteService.getPlanesEstudio(codigo));
    }

    @GetMapping("/notas/{rut}")
    public ResponseEntity<List<Nota>> getNotasEstudiante(@PathVariable("rut") String rut) {
        return ResponseEntity.ok(estudianteService.getNotasEstudiante(rut));
    }

    @PostMapping
    public Estudiante createEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.save(estudiante);
    }

    @PutMapping("/{id}")
    public Estudiante updateEstudiante(@PathVariable Long id, @RequestBody Estudiante estudiante) {
        // Aquí debes asegurarte de que el estudiante con el ID proporcionado exista
        // y luego actualizarlo con los nuevos datos
        return estudianteService.save(estudiante);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEstudiante(@PathVariable Long id) {
        estudianteService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Puedes agregar más endpoints según las necesidades
}
