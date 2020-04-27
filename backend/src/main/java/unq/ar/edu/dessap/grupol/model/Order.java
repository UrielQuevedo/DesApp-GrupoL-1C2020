package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "fk_buyer", nullable = false, updatable = false)
    private Buyer buyer;
    @Transient
    private List<Product> products;
    @Transient
    private List<Store> stores;
    @Column(updatable = false, nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    public Order() {}

    public Order(long id, Buyer buyer, List<Product> products, List<Store> stores, Date date) {
        this.id = id;
        this.buyer = buyer;
        this.products = products;
        this.stores = stores;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
