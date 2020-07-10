package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.aspects.ExceptionHandling;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.*;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.security.JwtTokenUtil;
import unq.ar.edu.dessap.grupol.security.JwtUserDetails;
import unq.ar.edu.dessap.grupol.security.JwtUserDetailsService;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@Validated
@RequestMapping(value = "/api/auth")
@Component
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;


    @PostMapping(value = "/register")
    @ExceptionHandling
    public ResponseEntity<User> register(@Valid @RequestBody UserDto userData) {
        User user = userService.create(userData.getUsername(), userData.getPassword(), userData.getEmail());

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginUserDto loginUserDto) {
        User user = userService.getUserByEmailAndPassword(loginUserDto.getEmail(), loginUserDto.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtTokenUtil.generateToken(userDetails);

        return new ResponseEntity<>(new JwtResponse(user.getId(), user.getEmail(), user.getUsername(),
                                        token), HttpStatus.OK);
    }

    @PostMapping(value = "/login/social")
    public ResponseEntity<JwtResponse> login(@Valid @RequestParam("email") String email) {
        User user = userService.getUserByEmail(email);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtTokenUtil.generateToken(userDetails);

        return new ResponseEntity<>(new JwtResponse(user.getId(), user.getEmail(), user.getUsername(),
                token), HttpStatus.OK);
    }

    @PostMapping(value = "/register/social")
    @ExceptionHandling
    public ResponseEntity<UserSocialDto> register(@Valid @RequestBody UserSocialDto userData) {
        User user = userService.createWithUsernameAndEmail(userData.getUsername(), userData.getEmail());

        return new ResponseEntity<>(Converter.toUserSocialDto(user), HttpStatus.CREATED);
    }

    @PostMapping(value = "/edit")
    @ExceptionHandling
    public ResponseEntity<User> edit(@Valid @RequestBody EditUserDto userData) {
        User user = userService.editUser(userData);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}