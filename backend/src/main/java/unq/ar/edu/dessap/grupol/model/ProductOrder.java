package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_order_id")
    @JsonIgnore
    private Order order;

    private int quantity;

    @OneToOne
    @JoinColumn(name = "fk_product_id")
    private Product product;

    public Double getTotalPrice() {
        return this.product.getPrice() * this.quantity;
    }

    public void verify() {
        if (this.quantity > this.product.getStock()) throw new RuntimeException("No hay esa cantidad de stock de " + this.product.getName());
        this.product.decreaseStock(this.quantity);
    }
}
