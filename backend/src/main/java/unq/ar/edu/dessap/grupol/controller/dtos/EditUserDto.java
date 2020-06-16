package unq.ar.edu.dessap.grupol.controller.dtos;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import java.util.Optional;

@Getter
public class EditUserDto {
    @NotEmpty(message = "La contraseña es necesaria")
    private String actualPassword;
    @NotEmpty(message = "El email es necesario")
    private String actualEmail;
    private String password;
    @NotEmpty(message = "El nombre de usuario no puede estar vacio")
    private String username;
    @NotEmpty(message = "El email no puede estar vacio")
    private String email;
}
