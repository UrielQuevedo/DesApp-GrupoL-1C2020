package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    //TODO para que esta el role?
    private String role;
    @Transient
    private List<Order> orders;
    private Location location;
    @OneToOne(mappedBy = "seller", cascade = CascadeType.ALL)
    private Store store;

    public User() {}

    public User(long id, String username, String password, String email, String role, List<Order> orders, Location location, Store store) {
        this.setId(id);
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setRole(role);
        this.setLocation(location);
        this.setOrders(orders);
        this.setStore(store);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
