package unq.ar.edu.dessap.grupol.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Turn {
    private long id;
    private Store store;
    private User user;
    private LocalDateTime date;
}
