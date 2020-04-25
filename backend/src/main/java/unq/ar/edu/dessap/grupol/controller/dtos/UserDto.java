package unq.ar.edu.dessap.grupol.controller.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class UserDto {
    @NotEmpty(message = "La contraseña esta vacia")
    private String password;
    @NotEmpty(message = "El nombre de usuario esta vacio")
    private String username;
    @Email(message = "El email esta mal escrito")
    @NotEmpty(message = "El email esta vacio")
    private String email;

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
}
