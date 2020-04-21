package unq.ar.edu.dessap.grupol.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/buyers")
public class BuyerController {

    @GetMapping(value = "/test")
    public ResponseEntity<String> testApi(@RequestParam(value = "name") String _name) {
        return new ResponseEntity<>(_name, HttpStatus.OK);
    }

}
