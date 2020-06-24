package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.aspects.ExceptionHandling;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDeleteProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.ProductOrder;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;
import unq.ar.edu.dessap.grupol.service.ShoppingCartService;

import javax.persistence.Convert;
import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/api/users")
@Component
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @ExceptionHandling
    @GetMapping(value = "/{id}/shoppingcart")
    public ResponseEntity<ShoppingCartDto> getShoppingCart(@PathVariable("id") Long id) {
        ShoppingCart shoppingCart = shoppingCartService.getShoppingCart(id);
        return new ResponseEntity<>(Converter.toShoppingCartDto(shoppingCart), HttpStatus.OK);
    }

    @ExceptionHandling
    @PostMapping(value = "/{id}/shoppingcart/product")
    public ResponseEntity<ShoppingCartDto> addProductToShoppingCart(@PathVariable("id") Long id, @RequestBody ShoppingCartProductDto shoppingCartProductDto) {
        ShoppingCart shoppingCart = shoppingCartService.addProductToShoppingCart(id, shoppingCartProductDto);
        return new ResponseEntity<>(Converter.toShoppingCartDto(shoppingCart), HttpStatus.OK);
    }

    @ExceptionHandling
    @DeleteMapping(value = "/{id}/shoppingcart/product")
    public ResponseEntity<ShoppingCartDto> removeProductToShoppingCart(@PathVariable("id") Long id, @RequestBody ShoppingCartDeleteProductDto shoppingCartDeleteProductDto) {
        ShoppingCart shoppingCart = shoppingCartService.removeProductToShoppingCart(id, shoppingCartDeleteProductDto);
        return new ResponseEntity<>(Converter.toShoppingCartDto(shoppingCart), HttpStatus.OK);
    }
}
