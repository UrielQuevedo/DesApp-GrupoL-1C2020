package unq.ar.edu.dessap.grupol.model;

import java.util.Date;
import java.util.List;

public class History {

    private long id;
    private Buyer buyer;
    private Date date;
    private List<Order> orders;

    public History(Buyer buyer, Date date, List<Order> orders) {
        this.buyer = buyer;
        this.date = date;
        this.orders = orders;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

}
