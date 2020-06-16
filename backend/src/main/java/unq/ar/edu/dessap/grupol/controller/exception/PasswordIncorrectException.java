package unq.ar.edu.dessap.grupol.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class PasswordIncorrectException extends RuntimeException {
    public PasswordIncorrectException() {
        super("La Contraseña es incorrecta");
    }
}
