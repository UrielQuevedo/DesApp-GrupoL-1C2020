package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.Date;
import java.util.List;

public class OrderBuilder {

    private long id;
    private Buyer buyer;
    private List<Product> products;
    private List<Store> stores;
    private Date date;

    public static OrderBuilder aOrder() {
        return new OrderBuilder();
    }

    public Order build() {
        return new Order(this.id, this.buyer, this.products, this.stores, this.date);
    }

    public OrderBuilder withId(int id) {
        this.id = id;
        return this;
    }


    public OrderBuilder withBuyer(Buyer buyer) {
        this.buyer = buyer;
        return this;
    }

    public OrderBuilder withProducts(List<Product> products) {
        this.products = products;
        return this;
    }

    public OrderBuilder withStores(List<Store> stores) {
        this.stores = stores;
        return this;
    }

    public OrderBuilder withDate(Date date) {
        this.date = date;
        return this;
    }

}
