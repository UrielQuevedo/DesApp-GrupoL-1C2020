package unq.ar.edu.dessap.grupol.model;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable @Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Location {
    private Double latitude;
    private Double longitude;
    private String address;
}
