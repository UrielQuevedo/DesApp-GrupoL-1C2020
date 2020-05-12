package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "buyers")
public class Buyer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    @Transient
    private List<Order> orders;
    private Location location;

    public Buyer(){}

    public Buyer(long _id, String _username, String _email, String _password, List<Order> _orders, Location _location) {
        this.setId(_id);
        this.setUsername(_username);
        this.setEmail(_email);
        this.setPassword(_password);
        this.setOrders(_orders);
        this.setLocation(_location);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
