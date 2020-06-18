package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Entity
@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "shoppingCart")
    @Builder.Default
    List<Order> orders = new ArrayList<>();

    Integer totalQuantity;
    Double totalPrice;

    public Double getTotalPrice() {
        return this.orders.stream().mapToDouble(Order::getTotalPrice).sum();
    }

    public int getTotalQuantity() {
        return this.orders.stream().flatMapToInt(order -> IntStream.of(order.getTotalQuantity())).sum();
    }

    public Order createOrder(Store store) {
        Order order = Order.builder()
                .shoppingCart(this)
                .store(store)
                .totalPrice(0.00)
                .totalQuantity(0)
                .build();
        this.orders.add(order);
        return order;
    }

    public Optional<Order> getOrder(long id) {
        return this.orders.stream()
                .filter(order -> order.getStore().getId() == id)
                .findAny();
    }
}
