package tingeso.backendentrega3.controllers;

import tingeso.backendentrega3.entities.Carrera;
import tingeso.backendentrega3.services.CarreraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carreras")
public class CarreraController {

    @Autowired
    private CarreraService carreraService;

    @GetMapping
    public List<Carrera> getAllCarreras() {
        return carreraService.findAll();
    }

    @GetMapping("/{id}")
    public Carrera getCarreraById(@PathVariable Long id) {
        return carreraService.findById(id);
    }

    @PostMapping
    public Carrera createCarrera(@RequestBody Carrera carrera) {
        return carreraService.save(carrera);
    }

    @PutMapping("/{id}")
    public Carrera updateCarrera(@PathVariable Long id, @RequestBody Carrera carrera) {
        // Aquí debes asegurarte de que la carrera con el ID proporcionado exista
        // y luego actualizarla con los nuevos datos
        return carreraService.save(carrera);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarrera(@PathVariable Long id) {
        carreraService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Puedes agregar más endpoints según las necesidades
}
