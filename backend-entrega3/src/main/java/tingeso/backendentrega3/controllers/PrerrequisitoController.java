package tingeso.backendentrega3.controllers;

import tingeso.backendentrega3.entities.Prerrequisito;
import tingeso.backendentrega3.services.PrerrequisitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prerrequisitos")
public class PrerrequisitoController {

    @Autowired
    private PrerrequisitoService prerrequisitoService;

    @GetMapping
    public List<Prerrequisito> getAllPrerrequisitos() {
        return prerrequisitoService.findAll();
    }

    @GetMapping("/{id}")
    public Prerrequisito getPrerrequisitoById(@PathVariable Long id) {
        return prerrequisitoService.findById(id);
    }

    @PostMapping
    public Prerrequisito createPrerrequisito(@RequestBody Prerrequisito prerrequisito) {
        return prerrequisitoService.save(prerrequisito);
    }

    @PutMapping("/{id}")
    public Prerrequisito updatePrerrequisito(@PathVariable Long id, @RequestBody Prerrequisito prerrequisito) {
        // Aquí debes asegurarte de que el prerrequisito con el ID proporcionado exista
        // y luego actualizarlo con los nuevos datos
        return prerrequisitoService.save(prerrequisito);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrerrequisito(@PathVariable Long id) {
        prerrequisitoService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Puedes agregar más endpoints según las necesidades
}
