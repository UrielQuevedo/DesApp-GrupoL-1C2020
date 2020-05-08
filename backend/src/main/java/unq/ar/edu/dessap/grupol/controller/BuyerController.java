package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.service.BuyerService;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/buyers")
@Component
@Validated
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Buyer> getBuyer(@NotEmpty(message = "Ingresar id") @PathVariable String id) {
        try {
            Buyer buyer = buyerService.getBuyerById(Long.parseLong(id));
            return new ResponseEntity<>(buyer, HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @GetMapping(value = "/{id}/orders")
    public ResponseEntity<List<Order>> getOrders(String id) {
        try {
            Buyer buyer = buyerService.getBuyerById(Long.parseLong(id));
            return new ResponseEntity<>(buyer.getOrders(), HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}/location")
    public ResponseEntity<Buyer> updateBuyerLocation(@Valid @RequestBody Location location, @PathVariable("id") Long id) {
        Buyer buyer = buyerService.updateBuyerLocation(id, location);
        return new ResponseEntity<>(buyer, HttpStatus.OK);
    }
}
