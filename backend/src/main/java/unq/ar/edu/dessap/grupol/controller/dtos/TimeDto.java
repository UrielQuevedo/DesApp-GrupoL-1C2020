package unq.ar.edu.dessap.grupol.controller.dtos;

import lombok.Data;

@Data
public class TimeDto {

    private String of;
    private String until;

    public String getOf() {
        return of;
    }

    public String getUntil() {
        return until;
    }

    public void setUntil(String until) {
        this.until = until;
    }

    public void setOf(String of) {
        this.of = of;
    }
}
