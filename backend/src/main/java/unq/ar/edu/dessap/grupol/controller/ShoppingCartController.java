package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;
import unq.ar.edu.dessap.grupol.service.ShoppingCartService;

@RestController
@Validated
@RequestMapping(value = "/api/users")
@Component
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping(value = "/{id}/shoppingcart")
    public ResponseEntity<ShoppingCart> getShoppingCart(@PathVariable("id") Long id) {
        ShoppingCart shoppingCart = shoppingCartService.getShoppingCart(id);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/shoppingcart/product")
    public ResponseEntity<ShoppingCart> addProductToShoppingCart(@PathVariable("id") Long id, @RequestBody ShoppingCartProductDto shoppingCartProductDto) {
        ShoppingCart shoppingCart = shoppingCartService.addProductToShoppingCart(id, shoppingCartProductDto);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }
}
