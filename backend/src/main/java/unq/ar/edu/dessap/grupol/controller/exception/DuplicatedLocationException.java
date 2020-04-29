package unq.ar.edu.dessap.grupol.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicatedLocationException extends RuntimeException {

    public DuplicatedLocationException() {

        super("Ya existe un store con esa location!");

    }
}
