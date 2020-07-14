package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    @JsonIgnore
    private User user;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderHistory", cascade = CascadeType.ALL)
    private List<Order> orders;
    private LocalDateTime date;

    public void addOrders(List<Order> orders) {
        orders.forEach(order -> order.setOrderHistory(this));
        this.orders = orders;
    }
}
