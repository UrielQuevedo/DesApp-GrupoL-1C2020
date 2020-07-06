package unq.ar.edu.dessap.grupol.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.aspects.ExceptionHandling;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.EditUserDto;
import unq.ar.edu.dessap.grupol.controller.dtos.LoginUserDto;
import unq.ar.edu.dessap.grupol.controller.dtos.UserDto;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.validation.Valid;


@RestController
@Validated
@RequestMapping(value = "/api/auth")
@Component
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/register")
    @ExceptionHandling
    public ResponseEntity<User> register(@Valid @RequestBody UserDto userData) {
        User user = userService.create(userData.getUsername(), userData.getPassword(), userData.getEmail());

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginUserDto> login(@RequestParam(name="email", required=true) String email,
                                              @RequestParam(name="password", required=true) String password) {
        User user = userService.getUserByEmailAndPassword(email, password);
        LoginUserDto loginUserDto = Converter.toLoginUserDto(user);
        return new ResponseEntity<>(loginUserDto, HttpStatus.OK);
    }

    @PostMapping(value = "/edit")
    @ExceptionHandling
    public ResponseEntity<User> edit(@Valid @RequestBody EditUserDto userData) {
        User user = userService.editUser(userData);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}