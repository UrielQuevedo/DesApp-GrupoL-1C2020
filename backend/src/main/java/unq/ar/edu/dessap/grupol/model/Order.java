package unq.ar.edu.dessap.grupol.model;

import java.util.List;

public class Order {

    private long id;
    private Buyer buyer;
    private List<Product> products;
    private List<Store> stores;

    public Order() {}

    public Order(long id, Buyer buyer, List<Product> products, List<Store> stores) {
        this.id = id;
        this.buyer = buyer;
        this.products = products;
        this.stores = stores;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public List<Store> getStores() {
        return stores;
    }

    public void setStores(List<Store> stores) {
        this.stores = stores;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

}
