package tingeso.backendentrega3.controllers;

import tingeso.backendentrega3.entities.Nota;
import tingeso.backendentrega3.services.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @GetMapping
    public List<Nota> getAllNotas() {
        return notaService.findAll();
    }

    @GetMapping("/{id}")
    public Nota getNotaById(@PathVariable Long id) {
        return notaService.findById(id);
    }

    @PostMapping
    public Nota createNota(@RequestBody Nota nota) {
        return notaService.save(nota);
    }

    @PutMapping("/{id}")
    public Nota updateNota(@PathVariable Long id, @RequestBody Nota nota) {
        // Aquí debes asegurarte de que la nota con el ID proporcionado exista
        // y luego actualizarla con los nuevos datos
        return notaService.save(nota);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        notaService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Puedes agregar más endpoints según las necesidades
}
