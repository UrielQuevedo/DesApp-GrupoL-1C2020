package unq.ar.edu.dessap.grupol.model;

import lombok.*;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Double total_price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orderHistory", cascade = CascadeType.ALL)
    private List<ProductOrder> productOrders;
    private LocalDateTime date;
}
