package unq.ar.edu.dessap.grupol.controller.exception;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicatedUsernameException extends RuntimeException {

    public DuplicatedUsernameException() {

        super("El usuario ya existe");
    }
}
