package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.service.BuyerService;

@RestController
@RequestMapping(value = "/api/buyers")
@Component
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @GetMapping(value = "/test")
    public ResponseEntity<Buyer> testApi() {
        Buyer buyer = buyerService.create("pepe", "123", "pepe@gmail.com");
        return new ResponseEntity<>(buyer, HttpStatus.OK);
    }

}
