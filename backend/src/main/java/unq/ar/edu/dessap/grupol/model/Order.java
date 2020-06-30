package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "orders")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Double totalPrice;
    private int totalQuantity;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_store_id")
    @JsonIgnore
    private Store store;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductOrder> productOrders = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_order_history_id")
    @JsonIgnore
    private OrderHistory orderHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_shopping_cart_id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    public void addProductOrder(Product product, int quantity) {
        Optional<ProductOrder> productOrderOptional = this.productOrders.stream()
                .filter(po -> po.getProduct().getId() == product.getId())
                .findAny();

        if(productOrderOptional.isPresent()) {
            ProductOrder productOrder = productOrderOptional.get();
            this.totalQuantity -= productOrder.getQuantity();
            this.totalPrice -= productOrder.getTotalPrice();
            productOrder.setQuantity(quantity);
        } else {
            ProductOrder newProductOrder = ProductOrder.builder()
                    .order(this)
                    .product(product)
                    .quantity(quantity)
                    .build();
            this.productOrders.add(newProductOrder);
        }
        this.totalPrice += product.getPrice() * quantity;
        this.totalQuantity += quantity;
    }

    public Long getStoreId() {
        return this.store.getId();
    }

    public void removeProductOrder(ProductOrder productOrderToRemove) {
        this.getProductOrders().removeIf(p -> p.getId() == productOrderToRemove.getId());
        this.totalPrice -= productOrderToRemove.getTotalPrice();
        this.totalQuantity -= productOrderToRemove.getQuantity();
    }

    public void verify(String turnTime, Payment payment) {
        this.store.verifyPayment(payment);
        this.store.verifyTurn(turnTime);
        this.productOrders.forEach(ProductOrder::verify);
    }
}
