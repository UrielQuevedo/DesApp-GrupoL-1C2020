package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.UserDto;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.service.SellerService;

@RestController
@RequestMapping(value = "/api/sellers")
@Component
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping
    public ResponseEntity<Seller> create(@RequestBody UserDto userDto) {
        Seller seller = sellerService.create(userDto);
        return new ResponseEntity<>(seller, HttpStatus.CREATED);
    }

}
