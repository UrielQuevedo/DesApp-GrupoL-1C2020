package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = true, nullable = false)
    private String username;
    @JsonIgnore
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    private String token;
    @Transient
    @JsonIgnore
    @Builder.Default
    private List<OrderHistory> orders = new ArrayList<>();
    private Location location;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_shopping_cart_id", referencedColumnName = "id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_store_id", referencedColumnName = "id")
    @JsonIgnore
    private Store store;


}
