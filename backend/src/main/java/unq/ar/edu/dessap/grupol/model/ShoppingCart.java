package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Entity
@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "shoppingCart")
    @Builder.Default
    private List<Order> orders = new ArrayList<>();

    private Integer totalQuantity;
    private Double totalPrice;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_user_id", referencedColumnName = "id")
    private User user;

    public Double getTotalPrice() {
        return this.orders.stream().mapToDouble(Order::getTotalPrice).sum();
    }

    public int getTotalQuantity() {
        return this.orders.stream().flatMapToInt(order -> IntStream.of(order.getTotalQuantity())).sum();
    }

    public void addProductOrder(Product product, int totalQuantity) {
        Optional<Order> optionalOrder = this.getOrder(product.getStore().getId());
        if(optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            this.addProductToOrder(order, product, totalQuantity);
        } else {
            Order newOrder = this.createOrder(product.getStore());
            this.addProductToOrder(newOrder, product, totalQuantity);
        }
    }

    private Optional<Order> getOrder(long id) {
        return this.orders.stream()
                .filter(order -> order.getStore().getId() == id)
                .findAny();
    }

    private void addProductToOrder(Order order, Product product, int totalQuantity) {
        order.addProductOrder(product, totalQuantity);
    }

    private Order createOrder(Store store) {
        Order order = Order.builder()
                .shoppingCart(this)
                .store(store)
                .totalPrice(0.00)
                .totalQuantity(0)
                .build();
        this.orders.add(order);
        return order;
    }

    public void removeOrder(long id) {
        this.orders.removeIf(order -> order.getId() == id);
    }
}
