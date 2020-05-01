package unq.ar.edu.dessap.grupol.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicatedUserEmailException extends RuntimeException {

    public DuplicatedUserEmailException() {

        super("El email ya existe");
    }
}
