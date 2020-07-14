package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Turn {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_store_id")
    @JsonIgnore
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    @JsonIgnore
    private User user;
}
