package unq.ar.edu.dessap.grupol.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_order_history_id")
    private OrderHistory orderHistory;

    @OneToOne
    @JoinColumn(name = "fk_product_id")
    private Product product;
}
