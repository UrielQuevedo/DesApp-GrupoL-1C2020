package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.*;

import java.time.LocalDateTime;

public class OrderBuilder {

    private long id;
    private User user;
    private String product;
    private Integer amount;
    private Store store;
    private LocalDateTime date;

    public static OrderBuilder aOrder() {
        return new OrderBuilder();
    }

    public OrderHistory build() {
        return new OrderHistory(this.id, this.user, this.product, this.amount, this.store, this.date);
    }

    public OrderBuilder withId(int id) {
        this.id = id;
        return this;
    }


    public OrderBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public OrderBuilder withProduct(String nameProduct) {
        this.product = nameProduct;
        return this;
    }

    public OrderBuilder withAmount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public OrderBuilder withStore(Store store) {
        this.store = store;
        return this;
    }

    public OrderBuilder withDate(LocalDateTime date) {
        this.date = date;
        return this;
    }
}
