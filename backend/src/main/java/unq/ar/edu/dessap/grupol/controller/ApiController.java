package unq.ar.edu.dessap.grupol.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Component
public class ApiController {
    @GetMapping(value = "/")
    ResponseEntity<String> home() {
        return new ResponseEntity<>("API de compras en casa", HttpStatus.OK);
    }
}

