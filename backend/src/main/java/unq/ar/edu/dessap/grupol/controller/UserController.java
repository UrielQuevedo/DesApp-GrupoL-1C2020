package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.aspects.ExceptionHandling;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/api/v1/users")
@Component
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/{id}")
    @ExceptionHandling
    public ResponseEntity<User> getUser(@NotEmpty(message = "Ingresar id") @PathVariable long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/orders")
    @ExceptionHandling
    public ResponseEntity<List<Order>> getOrders(long id) {
        List<Order> orders = userService.getUserOrdersById(id);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/location")
    @ExceptionHandling
    public ResponseEntity<User> updateUserLocation(@Valid @RequestBody Location location, @PathVariable("id") Long id) {
        User user = userService.updateUserLocation(id, location);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
