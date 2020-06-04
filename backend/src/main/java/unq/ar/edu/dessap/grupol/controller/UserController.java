package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.aspects.ExceptionHandling;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.OrderHistory;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/api/v1/users")
@Component
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/{id}")
    @ExceptionHandling
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/orders")
    @ExceptionHandling
    public ResponseEntity<List<OrderHistory>> getOrders(@PathVariable("id") long id) {
        List<OrderHistory> orders = userService.getUserOrdersById(id);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/location")
    @ExceptionHandling
    public ResponseEntity<User> updateUserLocation(@Valid @RequestBody Location location, @PathVariable("id") Long id) {
        User user = userService.updateUserLocation(id, location);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
