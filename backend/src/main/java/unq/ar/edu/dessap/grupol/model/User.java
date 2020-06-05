package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    @JsonIgnore
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    @Transient
    @JsonIgnore
    private List<OrderHistory> orders;
    private Location location;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_store_id", referencedColumnName = "id")
    @JsonIgnore
    private Store store;
}
