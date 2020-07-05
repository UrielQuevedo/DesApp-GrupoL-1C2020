package unq.ar.edu.dessap.grupol.controller.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class LoginUserDto {
    @NotEmpty(message = "La contraseña esta vacia")
    private String password;
    @Email(message = "El email esta mal escrito")
    @NotEmpty(message = "El email esta vacio")
    private String email;
    private String token = null;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
